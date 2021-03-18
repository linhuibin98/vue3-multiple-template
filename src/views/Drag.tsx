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
    const distance = reactive({
      startX: 0,
      startY: 0,
    })
    const mouseEvents = (() => {
      
      const onMouseDown = (tagetDrag: DragItem, e: MouseEvent) => {
        distance.startX = e.clientX
        distance.startY = e.clientY
      };

      const onMouseMove = (tagetDrag: DragItem, e: MouseEvent) => {
        tagetDrag.left += e.clientX -  distance.startX
        tagetDrag.top += e.clientY -  distance.startY
      }

      const onMouseUp = (tagetDrag: DragItem, e: MouseEvent) => { };

      return {
        onMouseDown,
        onMouseMove,
        onMouseUp,
      };
    })();
    return () => (
      <div class="drag-wrap">
        { drags.value.map(item => (
          <div 
            class="drag-wrap-item" 
            key={item.id} 
            onMousedown={(e: MouseEvent) => mouseEvents.onMouseDown(item, e)} 
            onMouseup={(e: MouseEvent) => mouseEvents.onMouseUp(item, e)}
            onMousemove={(e: MouseEvent) => mouseEvents.onMouseMove(item, e)}
            style={{ top: item.top + 'px', left: item.left + 'px' }}></div>
        ))}
      </div>
    );
  },
});