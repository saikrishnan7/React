//End of lecture 40

class IndecisionApp extends React.Component
{
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: ['One', 'Two', 'Three']
        }
    }
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            };
        });
    }
    handlePick() {
        const optionIndex = Math.floor(Math.random() * this.state.options.length);
        alert(this.state.options[optionIndex]);
    }
    handleAddOption(option) {
        if(!option) {
            return 'Enter a valid option to add';
        }
        else if(this.state.options.indexOf(option) > -1) {
            return 'Option already exists';
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    }
    render() {
        const title = 'Indecision';
        const subtitle = 'Put your life in the hands of a computer';
        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    );
};

const Action = (props) => {
    return (
        <div>
            <button onClick={props.handlePick} disabled={!props.hasOptions}>What should I do?</button>
        </div>
    );
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
                props.options.map((opt) => <Option key={opt} optionText = {opt} />)
            }
            <Option />
        </div>
    );
}

const Option = (props) => {
    return (
        <div>
            {props.optionText}
        </div>
    );
}

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        const text = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(text);
        this.setState(() => {
            return {
                error: error
            };
        });
    }
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
                <input type="text" name="option" />
                <button>Add Option</button>
            </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));