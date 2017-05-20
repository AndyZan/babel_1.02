const LoadingAdd = () => {
    return (
        <div>
            AddForm
        </div>
    )
};

/*
const Layer = (props) => {
    return(
        {props.aphorism._id}
    );
};
*/
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
    }
}