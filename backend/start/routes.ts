/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/*
|--------------------------------------------------------------------------
| Authentication routes
|--------------------------------------------------------------------------
*/
router
  .group(() => {
    // Google OAuth routes (public)
    router.get('/google/redirect', '#controllers/social_auths_controller.googleRedirect')
    router.get('/google/callback', '#controllers/social_auths_controller.googleCallback')

    // Protected routes (require API token)
    router.post('/logout', '#controllers/social_auths_controller.logout').use(middleware.auth())
    router.get('/me', '#controllers/social_auths_controller.me').use(middleware.auth())
  })
  .prefix('/auth')
