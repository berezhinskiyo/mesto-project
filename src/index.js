import './pages/index.css'; // добавьте импорт главного файла стилей 
import * as card from './components/card';
import * as validator from './components/validate';
card.initializeCards();
validator.enableValidation(validator.validationConfig);


