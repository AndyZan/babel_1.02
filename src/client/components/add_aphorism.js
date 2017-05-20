const LoadingAdd = () => {
    return (
        <div>
            AddForm
        </div>
    )
};


const Layer = (props) => {
    return (
        <tr>
        {props.aphorism._id}
        {props.aphorism.author}
        {props.aphorism.text}
        </tr>
    );
};

export default class addAphorism extends React.component {
    state ={
        aphorisms: []
    };

    componentWillMount() {
        fetch("/aphorisms")
            .then((response) => {
                 if (response.status == 200) {
                response
                    .json()
                    .then((response) => {
                        this.setState({
                            "aphorism":response
                        });
                    });
                  }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const content = this.state.aphorisms.length ?
            this.state.aphorisms.map(aphorism => <Layer key={aphorism._id} aphorism={aphorism} onDestroy={this.onDestroy.bind(this)} />) :
            <LoadingAdd/>;
    }

};