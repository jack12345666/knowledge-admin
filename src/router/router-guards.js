import router from './index'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
