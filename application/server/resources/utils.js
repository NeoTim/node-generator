
const ignoreApi_  = /^\/api\/(.*)/;
const ignorejs_   = /\.js(\?.*)?$/;
const ignorecss_  = /\.css(\?.*)?$/;
const ignoresvg_  = /\.svg(\?.*)?$/;
const ignoreico_  = /\.ico(\?.*)?$/;
const ignorewoff_ = /\.woff(\?.*)?$/;
const ignorepng_  = /\.png(\?.*)?$/;
const ignorejpg_  = /\.jpg(\?.*)?$/;
const ignorejpeg_ = /\.jpeg(\?.*)?$/;
const ignoregif_  = /\.gif(\?.*)?$/;
const ignorepdf_  = /\.pdf(\?.*)?$/;


/**
 *   Options passed to app.use(on connect livre-reload)
 */
export function liveReloadIgnore() {
  const connectLiveReload = require('connect-livereload');
  return connectLiveReload({
    ignore: [ignoreApi_, ignorejs_, ignorecss_, ignoresvg_, ignoreico_, ignorewoff_, ignorepng_, ignorejpg_, ignorejpeg_, ignoregif_, ignorepdf_]
  })
}
