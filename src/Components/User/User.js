import React, { Component } from 'react'
import './User.css'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducers/userReducer'

class User extends Component {
    constructor() {
        super()

        this.state = {
            isUploading: false,
            image: ''
        }
    }

    async componentDidMount() {
        await this.props.getUser()
        this.setState({ image: this.props.user.profile_image })
    }

    getSignedRequest = ([file]) => {
        this.setState ({ isUploading: true})

        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

        axios.get('/api/sign-s3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            },
        })
        .then(response => {
            const { signedRequest, url } = response.data
            this.uploadFile(file, signedRequest, url)
        })
        .catch(err => console.log(err))
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            }
        }

        axios.put(signedRequest, file, options)
        .then(async () => {
            this.setState ({ isUploading: false, url})
            await axios.put('/api/upload', {url})
            await this.props.getUser()
        })
        .catch(err => this.setState({ isUploading: false }))
    }

    render() {
        return (
            <div className="user-page">
                <div>
                    <div style={{height: '75px'}}></div>
                    <h1>Account Settings</h1>
                </div>
                {this.props.user ?
                <div>
                    <div>
                        {this.props.user.profile_image ?
                        <img src={this.props.user.profile_image} alt="" height="300" width="300" />
                        :
                        <img src="https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg.png" alt="" height="300" width="200"/>
                        }
                    </div>
                        <Dropzone
                            onDropAccepted={this.getSignedRequest}
                            style={{
                                position: 'relative',
                                width: 200,
                                height: 200,
                                borderWidth: 7,
                                marginTop: 100,
                                borderColor: 'rgb(102, 102, 102)',
                                borderStyle: 'dashed',
                                borderRadius: 5,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 28,
                            }}
                            accept="image/*"
                            multiple={false}
                            >
                                {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()}>
                                        {this.state.isUploading ?
                                        <GridLoader/>
                                        :
                                        <div>
                                        <input {...getInputProps()}/>
                                        <p>Drop File or Click Here</p>
                                        </div>
                                        }
                                    </div>
                                )}
                        </Dropzone>
                        <h1>Name: {this.props.user.name}</h1>
                        <h1>email: {this.props.user.email}</h1>
                </div>
                :
                null
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.data
    }
}

export default connect(mapStateToProps, { getUser })(User)