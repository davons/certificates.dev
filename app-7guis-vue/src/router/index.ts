import { createRouter, createWebHistory } from 'vue-router'
import CounterView from '@/views/CounterView.vue'
import TemperatureConverterView from '@/views/TemperatureConverterView.vue'
import FlightBookerView from '@/views/FlightBookerView.vue'
import TimerView from '@/views/TimerView.vue'
import CrudView from '@/views/CrudView.vue'
import CircleDrawerView from '@/views/CircleDrawerView.vue'
import CellsView from '@/views/CellsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [,
    {
      path:'/counter',
      name: 'Counter',
      component: CounterView
    },
    {
      path: '/temperature',
      name: 'TemperatureConverter',
      component: TemperatureConverterView
    },
    {
      path: '/flight-booker',
      name:'FlightBooker',
      component: FlightBookerView
    }
    ,
    {
      path: '/timer',
      name:'Timer',
      component: TimerView
    }
    ,
    {
      path: '/crud',
      name:'Crud',
      component:CrudView
    }
    ,
    {
      path: '/circle-drawer',
      name:'CircleDrawer',
      component: CircleDrawerView
    }
    ,
    {
      path: '/cells',
      name:'Cells',
      component: CellsView
    }
  ],
})

export default router
