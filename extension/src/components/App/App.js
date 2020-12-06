import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Authentication from '../../util/Authentication/Authentication'
import PanZoomContainer from './components/PanZoomContainer'
import { BottomBarContainer } from './containers/bottomBar'
import { authenticate } from '../../redux/actions'
import './App.css'

class AppComponent extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            isVisible: true
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
    }

    componentWillUnmount() {
        if (this.twitch) {
            this.twitch.unlisten('broadcast', () => console.log('successfully unlistened'))
        }
    }

    render() {
        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'} >
                        <PanZoomContainer />
                        <BottomBarContainer twitch={this.twitch} />
                    </div>
                </div >
            )
        } else {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
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