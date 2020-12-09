import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PanZoomContainer from './components/PanZoomContainer'
import { BottomBarContainer } from './containers/bottomBar'
import { authenticate } from '../../redux/actions'
import './App.css'

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            isVisible: true,
            socketState: 0
        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return { theme: context.theme }
            })
        }
    }

    visibilityChanged(isVisible) {
        this.setState(() => {
            return {
                isVisible
            }
        })
    }

    componentDidMount() {
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.props.dispatch(auth.token)
                if (!this.state.finishedLoading) {
                    this.setState(() => {
                        return { finishedLoading: true }
                    })
                }
            })


            this.twitch.onVisibilityChanged((isVisible, _c) => {
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })
        }

        this.props.socket.onopen = () => {
            this.setState({
                socketState: this.props.socket.readyState
            })
        }

        this.props.socket.onclose = () => {
            this.setState({
                socketState: this.props.socket.readyState
            })
        }

        this.props.socket.onerror = () => {
            this.setState({
                socketState: this.props.socket.readyState
            })
        }
    }

    componentWillUnmount() {
        if (this.twitch) {
            this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
        }
    }

    render() {
        if (this.state.finishedLoading && this.state.isVisible && this.state.socketState === 1) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'} >
                        <PanZoomContainer />
                        <BottomBarContainer />
                    </div>
                </div >
            )
        } else if (this.state.socketState === 0) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <div>Loading...</div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <div>Could Not Connect to the Server :(</div>
                    </div>
                </div>
            )
        }

    }
}

AppComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
    dispatch: (token) => {
        dispatch(authenticate(token))
    }
})

export const App = connect(null, mapDispatchToProps)(AppComponent)