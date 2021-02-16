import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

let debouncedFunction: any;


function App() {

  const [inputValue, setInputValue] = useState('');

  const onSearchChange = (event: any) => {
    try {

      setInputValue(event.target.value);

      /**
       * cancel old saved debounced functions
       */
      if (debouncedFunction && debouncedFunction.cancel)
        debouncedFunction.cancel();

      debouncedFunction = debounce(async () => {

        // use event value if you want in request
        const response: any = await axios.get(
          'https://jsonplaceholder.typicode.com/todos/1' + `?test=${event.target.value}`
        );

        if (response.data) {
          console.log('autocomplete results...')
        }


      }, 2000);
      debouncedFunction();


    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div >

      <input
        value={inputValue}
        onChange={onSearchChange}
        placeholder="Search with autocomplete..."
      />

    </div>
  );
}

export default App;
