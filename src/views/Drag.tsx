import { ref, defineComponent, reactive } from "vue";
import './drag.scss'
interface DragItem {
  top: number;
  left: number;
  id: number;
}
const defaultDrags = (): DragItem[] => [
  { top: 20, left: 10, id: 1 },
  { top: 60, left: 70, id: 2 },
  { top: 100, left: 130, id: 3 },
]
export default defineComponent({
  setup() {
    const drags = ref<DragItem[]>(defaultDrags());
    const distance = reactive<{
      [t: string]: {
        startX: number
        startY: number
      }
    }>({})
    const mouseEvents = (() => {

      const onMouseDown = (tagetDrag: DragItem, e: any) => {
        e.stopPropagation()
        e.preventDefault()
        distance[tagetDrag.id] = {
          startX: e.clientX,
          startY: e.clientY
        }
        const tagetDragLeft = tagetDrag.left
        const tagetDragTop = tagetDrag.top
        const minLeft = e.target.offsetLeft
        const maxLeft = e.target.parentElement.clientWidth - minLeft - e.target.offsetWidth
        const minTop = e.target.offsetTop
        const maxTop = e.target.parentElement.clientHeight - minTop - e.target.offsetHeight

        const positions = {
          tagetDragLeft,
          tagetDragTop,
          minLeft,
          maxLeft,
          minTop,
          maxTop
        }
        const onMove = (e: any) => {
          onMouseMove(tagetDrag, e, positions)
        }
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', function onUp() {
          console.log('upupupup')
          document.removeEventListener('mousemove', onMove)
          document.removeEventListener('mouseup', onUp)
        })
      };
      const onMouseMove = (tagetDrag: DragItem, e: MouseEvent, { tagetDragLeft, tagetDragTop, minLeft, maxLeft, minTop, maxTop }: any) => {
        let disX = e.clientX - distance[tagetDrag.id].startX
        let disY = e.clientY - distance[tagetDrag.id].startY
        console.log('disX', disX)
        console.log('minLeft', minLeft)
        console.log('maxLeft', maxLeft)
        // 边界
        if (-disX > minLeft) {
          disX = -minLeft
        } else if (disX > maxLeft) {
          disX = maxLeft
        }

        if (-disY > minTop) {
          disY = -minTop
        } else if (disY > maxTop) {
          disY = maxTop
        }

        tagetDrag.left = disX + tagetDragLeft
        tagetDrag.top = disY + tagetDragTop
      }

      const onDragStart = (e: MouseEvent) => {
        e.preventDefault()
      }

      const onDragEnd = (e: MouseEvent) => {
        e.preventDefault()
      }

      return {
        onMouseDown,
        onDragStart,
        onDragEnd
      };
    })();
    return () => (
      <div class="drag-wrap">
        { drags.value.map(item => (
          <div
            class="drag-wrap-item"
            key={item.id}
            onMousedown={(e: MouseEvent) => mouseEvents.onMouseDown(item, e)}
            onDragstart={mouseEvents.onDragStart}
            onDragend={mouseEvents.onDragEnd}
            style={{ top: item.top + 'px', left: item.left + 'px' }}></div>
        ))}
      </div>
    );
  },
});