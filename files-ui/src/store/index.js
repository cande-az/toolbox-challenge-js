import { createStore, combineReducers } from 'redux'
import filesReducer from './files/reducer'

// Combinar reducers (preparado para escalabilidad)
const rootReducer = combineReducers({
  files: filesReducer
})

// Crear store con configuración básica (sin middleware adicional)
const store = createStore(rootReducer)

export default store
