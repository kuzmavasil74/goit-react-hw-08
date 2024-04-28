import { Helmet } from 'react-helmet-async'
import css from './HomePage.module.css'
const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>HomePage from FSO98</title>
      </Helmet>
      <p className={css.infoText}>
        Ласкаво просимо до вашого нового телефонного довідника!
      </p>
    </div>
  )
}

export default HomePage
