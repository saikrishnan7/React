import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Action from './Action'
import Options from './Options'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component
{
    state = {
        options: [],
        selectedOption: undefined
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }))
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    handleClearModal = () => {
        this.setState(() => ({ selectedOption: undefined}));
    }

    handlePick = () => {
        const optionIndex = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[optionIndex];
        this.setState(() => ({ selectedOption: option}));
    }

    handleAddOption = (option) => {
        if(!option) {
            console.log('testingggg!!!');
            return 'Enter a valid option to add';
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'Option already exists';
        }
        this.setState((prevState) => ({options: prevState.options.concat(option)}));
    }
    componentDidMount() {
        try{
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if(options) 
            {
                this.setState(() => ({options}));
            }
        }
        catch(e) {
            //Do nothing at all
        }
    }

    componentWillUnmount() {
        
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }   

    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        handlePick={this.handlePick} 
                    />
                    <Options 
                        options={this.state.options} 
                        handleDeleteOptions={this.handleDeleteOptions} 
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption handleAddOption={this.handleAddOption}/>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearModal={this.handleClearModal}    
                />
            </div>
        );
    }
    
}