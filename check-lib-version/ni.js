const path = require('path');
const fs = require('fs');
const findUp = require('find-up');

const shell = require('shelljs');

// const res = shell.exec('pnpm i');

// console.log(res);

const npmRun = (agent) => (args) => {
    if (args.length > 1)
        return `${agent} run ${args[0]} -- ${args.slice(1).join(' ')}`
    else return `${agent} run ${args[0]}`
}

const LOCKS = {
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
};

const AGENTS = {
    'npm': {
        'run': npmRun('npm'),
        'install': 'npm i',
        'frozen': 'npm ci',
        'global': 'npm i -g {0}',
        'add': 'npm i {0}',
        'upgrade': 'npm update {0}',
        'upgrade-interactive': null,
        'execute': 'npx {0}',
        'uninstall': 'npm uninstall {0}',
        'global_uninstall': 'npm uninstall -g {0}',
    },
    'yarn': {
        'run': 'yarn run {0}',
        'install': 'yarn install',
        'frozen': 'yarn install --frozen-lockfile',
        'global': 'yarn global add {0}',
        'add': 'yarn add {0}',
        'upgrade': 'yarn upgrade {0}',
        'upgrade-interactive': 'yarn upgrade-interactive {0}',
        'execute': 'yarn dlx {0}',
        'uninstall': 'yarn remove {0}',
        'global_uninstall': 'yarn global remove {0}',
    },
    'yarn@berry': {
        'run': 'yarn run {0}',
        'install': 'yarn install',
        'frozen': 'yarn install --immutable',
        // yarn3 removed 'global', see https://github.com/yarnpkg/berry/issues/821
        'global': 'npm i -g {0}',
        'add': 'yarn add {0}',
        'upgrade': 'yarn up {0}',
        'upgrade-interactive': 'yarn up -i {0}',
        'execute': 'yarn dlx {0}',
        'uninstall': 'yarn remove {0}',
        'global_uninstall': 'npm uninstall -g {0}',
    },
    'pnpm': {
        'run': npmRun('pnpm'),
        'install': 'pnpm i',
        'frozen': 'pnpm i --frozen-lockfile',
        'global': 'pnpm add -g {0}',
        'add': 'pnpm add {0}',
        'upgrade': 'pnpm update {0}',
        'upgrade-interactive': 'pnpm update -i {0}',
        'execute': 'pnpm dlx {0}',
        'uninstall': 'pnpm remove {0}',
        'global_uninstall': 'pnpm remove --global {0}',
    },
}

async function detect(cwd) {
    let agent = null

    const lockPath = await findUp(Object.keys(LOCKS), { cwd })
    let packageJsonPath;

    if (lockPath) {
        packageJsonPath = path.resolve(lockPath, '../package.json')
    } else {
        packageJsonPath = await findUp('package.json', { cwd })
    }
    // read `packageManager` field in package.json
    if (packageJsonPath && fs.existsSync(packageJsonPath)) {
        try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
            if (typeof pkg.packageManager === 'string') {
                const [name, version] = pkg.packageManager.split('@')
                if (name === 'yarn' && parseInt(version) > 1) {
                    agent = 'yarn@berry';
                } else if (name in AGENTS) {
                    agent = name;
                } else {
                    console.warn('Unknown packageManager:', pkg.packageManager);
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    // detect based on lock
    if (!agent && lockPath) {
        agent = LOCKS[path.basename(lockPath)];
    }
    // 默认使用 pnpm
    if (!agent) {
        agent = 'pnpm';
    }

    return agent;
}

detect(process.cwd()).then(agent => {
    const execRes = shell.exec(AGENTS[agent].add.replace('{0}', 'vue@latest'));
    if (execRes.code !== 0) {
        console.error(execRes.stderr);
    }
});