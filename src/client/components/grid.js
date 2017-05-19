const LoadingGrid = () => {
    return (
        <tr>
            <td colSpan="5">
                <div className="grid__empty">
                    Загружаю
                </div>
            </td>
        </tr>
    );
};

const Row = (props) => {
    return (
        <tr>
            <td>{props.aphorism._id}</td>
            <td>{props.aphorism.author}</td>
            <td>{props.aphorism.text}</td>
            <td><a href="#">редактировать</a></td>
            <td><a href="#" onClick={() => {props.onDestroy(props.aphorism._id)}} dangerouslySetInnerHTML={ {__html: "&times;"} }></a></td>
        </tr>
    );
};

export default class Grid extends React.Component {
    state = {
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
                                "aphorisms": response
                            });
                        });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onDestroy(id) {
        fetch(
            "/aphorisms/" + id, {
                method: "DELETE"
            })
            .then((response) => {
                if (response.status == 200) {
                    this.setState({
                        aphorisms: this.state.aphorisms.filter(aphorism => {
                            return aphorism._id != id
                        })
                    });
                }
            })
            .catch(error => console.log(error));
    }

    render() {
        const content = this.state.aphorisms.length ?
            this.state.aphorisms.map(aphorism => <Row key={aphorism._id} aphorism={aphorism} onDestroy={this.onDestroy.bind(this)} />) :
            <LoadingGrid/>;

        return (
            <table className="grid">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Автор</th>
                    <th>Афоризм</th>
                    <th colSpan="2"></th>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </table>
        );
    }
}