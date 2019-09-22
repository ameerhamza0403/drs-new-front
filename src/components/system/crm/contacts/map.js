import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import './autosuggest.css';
import {SuggestLocation} from '../shared/map';

let ContactMap = () => {

  let [dataofPlaces, setdataofPlaces]= useState([]);
  let AutoSuggestionData = [];

  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : AutoSuggestionData.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = suggestion => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  let [value, setValue] = useState("");
  let [suggestions, setSuggestions] = useState([]);

  function onChange(event, { newValue }) {
    setValue(newValue);
    if(value.length>1){
      getlistapi(value);
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  function onSuggestionsFetchRequested({ value }) {
    setSuggestions(getSuggestions(value));
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  let onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Search for Location",
    value,
    onChange: onChange,
    type: 'select',
  };

  // --------- API Call

  async function getlistapi(text){
    const {data: dataofPlaces}= await SuggestLocation(text);
    setdataofPlaces(dataofPlaces);
    // AutoSuggestionData=dataofPlaces;
    console.log(dataofPlaces)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div className="col-12"></div>
      </div>
    </div>
  );
};

export default ContactMap;
