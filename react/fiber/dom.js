function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createElement(type, props, ...children) {
  return {
    type,
    props: { 
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  };
} // schedule


let nextFiberReconcileWork = null; // 当前正在渲染的fiber
let wipRoot = null; // 根工作进程

/**
 * 空闲时间调度
 */
function workLoop(deadline) {
  let shouldYield = false; // 是否暂停
  // 如果当前正在渲染的fiber不为空且不在暂停，则继续渲染
  while (nextFiberReconcileWork && !shouldYield) {
    nextFiberReconcileWork = performUnitOfWork(nextFiberReconcileWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  if (!nextFiberReconcileWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function commitRoot() {
  commitWork(wipRoot.child);
  wipRoot = null
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }

  let domParentFiber = fiber.return;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.return;
  }
  const domParent = domParentFiber.dom;
  if (
    fiber.effectTag === "PLACEMENT" &&
    fiber.dom !== null
  ) {
      domParent.appendChild(fiber.dom)
  } 
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}

/**
 * fiber工作单元
 * @param {*} fiber 当前正在渲染的fiber
 */
function performUnitOfWork(fiber) {
  reconcile(fiber); // 渲染fiber

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}

/**
 * 
 * @param {*} fiber 当前正在渲染的fiber
 */
function reconcile(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
  let index = 0;
  let preSiblingFiber = null;

  while (index < elements.length) {
    const element = elements[index];
    let newFiber = {
      type: element.type,
      props: element.props,
      dom: null,
      return: wipFiber,
      effectTag: 'PLACEMENT'
    };

    if (index === 0) {
      // 如果是第一个元素，则将其设置为父fiber的子fiber
      wipFiber.child = newFiber;
    } else if (element) {
      preSiblingFiber.sibling = newFiber;
    }

    preSiblingFiber = newFiber;
    index++;
  }
}

/**
 * 生成dom
 * @param {*} fiber 当前正在渲染的fiber
 */
function createDom(fiber) {
  const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

  for (const prop in fiber.props) {
      setAttribute(dom, prop, fiber.props[prop]);
  }

  return dom;
}

function setAttribute(dom, name, value) {
  if (name === 'children') {
    return;
  }
  if (name === 'nodeValue') {
    dom.textContent = value;
  } else if (isEventListenerAttr(name, value)) {
    const eventType = name.slice(2).toLowerCase();
    dom.addEventListener(eventType, value);
  } else if (isStyleAttr(name, value)) {
    Object.assign(dom.style, value);
  } else if (isPlainAttr(name, value)) {
    dom.setAttribute(name, value);
  }
}

function isEventListenerAttr(key, value) {
  return typeof value == 'function' && key.startsWith('on');
}

function isStyleAttr(key, value) {
  return key == 'style' && typeof value == 'object';
}

function isPlainAttr(key, value) {
  return typeof value != 'object' && typeof value != 'function';
}

function render(element, container) {
  /**
   * 第一次渲染时，会创建一个新的fiber，并将其设置为当前正在渲染的fiber
   */
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    }
  };
  nextFiberReconcileWork = wipRoot;
}

const dom = {
  createElement,
  render
};