function create(Cls, attributes, ...children) {
  // 可以为组件添加config
  // const o = new Cls(config)

  let o

  if (typeof Cls === 'string') {
    o = new MyComponents(Cls)
  } else {
    o = new Cls()
  }

  if (attributes) {
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        o.root.setAttribute(key, attributes[key])
      }
    }
  }
  console.log('children', children)
  if (children && children.length > 0) {
    for (const child of children) {
      if (child instanceof MyComponents) {
        o.appendChild(child)
      } else {
        o.appendChild(new MyText(child))
      }
    }
  }
  return o
}

class MyText {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class MyComponents {
  constructor(tag = 'div') {
    this.children = []
    this.root = document.createElement(tag)
  }

  setAttribute(name, value) {
    this[name] = value
  }
  appendChild(child) {
    this.children.push(child)
  }
  mountTo(parent) {
    let current = this
    function append(pare) {
      if (pare.children && pare.children.length > 0) {
        for (const child of pare.children) {
          current = child
          append(child)
          pare.root.appendChild(child.root)
        }
      }
    }
    append(current)
    parent.appendChild(this.root)
  }
}

class Div extends MyComponents {

}

const testJsx = () => (
    <div id='div'>
      <div id="22" style="color: red;font-size: 18px;">sss ss</div>
    </div>
)

const App = <div>
  { testJsx() }
  sss
</div>

function createApp(App, root) {
  const mountEl = document.querySelector(root)
  // debugger
  App.mountTo(mountEl)
  return App
}

createApp(App, '#jsx')