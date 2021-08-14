import {Component} from "react";

export default class ErrorBoundary extends Component{
    state = {
        error: null
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <div>Something is wrong, please try to later</div>
        }

        return this.props.children
    }
}