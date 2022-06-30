import '../styles/_globals.scss'
import { MyApp } from '../components/pages/App'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

export default MyApp
