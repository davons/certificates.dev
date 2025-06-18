import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MarkdownEditorView from '../views/MarkdownEditorView.vue'
import FetchingDataView from '../views/FetchingDataView.vue'
import GridWithSortFilterView from '@/views/GridWithSortFilterView.vue'
import TreeView from '@/views/TreeView.vue'
import SVGGraphView from '@/views/SVGGraphView.vue'
import ModalTransitionView from '@/views/ModalTransitionView.vue'
import ListTransitionView from '@/views/ListTransitionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/markdonw-editor',
      name: 'MarkdownEditor',
      component: MarkdownEditorView,
    },
    {
      path: '/fetching-data',
      name: 'FetchingData',
      component: FetchingDataView
    },
    {
      path: '/grid-sort-filter',
      name: 'GridWithSortFilter',
      component: GridWithSortFilterView
    },
    {
      path: '/tree-view',
      name: 'TreeView',
      component: TreeView
    },
    {
      path: '/svg-graph',
      name: 'SVGGraph',
      component: SVGGraphView
    },
    {
      path: '/modal-transition',
      name: 'ModalTransition',
      component: ModalTransitionView
    },
    {
      path: '/List-transition',
      name: 'ListTransition',
      component: ListTransitionView
    }
  ],
})

export default router
