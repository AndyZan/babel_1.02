import Grid from "./grid";
import AddAphorism from "./add_aphorism";

export default class Container extends React.Component {
    state = {
        showMore: false,
        plusAphorism: false
    };

    toggleShowMore() {
        this.setState({
            showMore: !this.state.showMore
        });
    }

    addAphorism() {
        this.setState({
            plusAphorism: !this.state.plusAphorism
        });

    }


    render() {
        return (
            <div className="container">
                {this.props.children}
                <nav>
                    <ul>
                        <li><a href="#" onClick={() => {this.toggleShowMore()}}>{!this.state.showMore ? "Load more" : "Hide"}</a></li>
                        <li><a href="#" onClick={() => {this.addAphorism()}}>{!this.state.plusAphorism ? "Add" : "Back"}</a></li>
                    </ul>
                </nav>
                {this.state.showMore ? <Grid /> : null}
                {this.state.plusAphorism ? <AddAphorism /> : null}
            </div>
        )
    }
}
