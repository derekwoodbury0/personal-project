import React, { Component } from 'react'
import './User.css'
import axios from 'axios'
import { v4 as randomString } from 'uuid'
import Dropzone from 'react-dropzone'
import { GridLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../../redux/reducers/userReducer'

class User extends Component {
    constructor() {
        super()

        this.state = {
            isUploading: false,
            image: '',
            edit: false,
            name: '',
            email: '',
            username: ''
        }
    }

    async componentDidMount() {
        await this.props.getUser()
    }

    dropRejected = () => {
        alert('File size exceeded or file type not allowed. Please choose a different file to upload.')
    }

    toggleEdit = () => {
        this.setState ({ edit: !this.state.edit })
    }

    handleChange = e => {
        let { name, value } = e.target

        this.setState ({ [name]: value })
    }

    handleClick = () => {
        let { name, email, username } = this.state

        this.props.updateUser({name, email, username})
        .then(() => this.toggleEdit())
        .catch(err => alert(err))
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
            this.setState ({ isUploading: false })
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
                    <div className="user-page-main">
                        <div className="user-page-main-image">
                            <div>
                                {this.props.user.profile_image ?
                                <img src={this.props.user.profile_image} alt="" height="200" width="200" />
                                :
                                <img src="https://www.achievesuccesstutoring.com/wp-content/uploads/2019/05/no-photo-icon-22.jpg.png" alt="" height="200" width="200"/>
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
                                    maxSize={2000000}
                                    onDropRejected={this.dropRejected}
                                    >
                                        {({getRootProps, getInputProps}) => (
                                            <div {...getRootProps()} style={{display: 'flex', justifyContent: 'center'}}>
                                                {this.state.isUploading ?
                                                <GridLoader/>
                                                :
                                                <div className="user-photo-drop-zone">
                                                <input {...getInputProps()}/>
                                                <p>Drop File Or Click Here To Add/Change Image</p>
                                                </div>
                                                }
                                            </div>
                                        )}
                                </Dropzone>
                        </div>
                        <div className="user-container">
                            {this.state.edit ?
                                <div className="user-info-container">
                                    <h3><span style={{textDecoration: 'underline'}}>Name</span>: <input
                                        className="user-info-container-input"
                                        name="name" 
                                        onChange={this.handleChange} 
                                        defaultValue={this.props.user.name}/>
                                    </h3>
                                    <h3><span style={{textDecoration: 'underline'}}>Username</span>: <input
                                        className="user-info-container-input short-input"
                                        name="username" 
                                        onChange={this.handleChange} 
                                        defaultValue={this.props.user.username}/>
                                    </h3>
                                    <h3><span style={{textDecoration: 'underline'}}>Email</span>: &nbsp;<input
                                        className="user-info-container-input"
                                        name="email" 
                                        onChange={this.handleChange} 
                                        defaultValue={this.props.user.email}/>
                                    </h3>
                                    <h3><span style={{textDecoration: 'underline'}}>User ID</span>: {this.props.user.user_id}</h3>
                                    <div>
                                        <button onClick={this.toggleEdit}>Cancel</button>
                                        <button onClick={this.handleClick}>Update</button>
                                    </div>
                                </div>
                                :
                                <div className="user-info-container">
                                    <h3><span style={{textDecoration: 'underline'}}>Name</span>: {this.props.user.name}</h3>
                                    <h3><span style={{textDecoration: 'underline'}}>Username</span>: {this.props.user.username}</h3>
                                    <h3><span style={{textDecoration: 'underline'}}>Email</span>: {this.props.user.email}</h3>
                                    <h3><span style={{textDecoration: 'underline'}}>User ID</span>: {this.props.user.user_id}</h3>
                                    <button onClick={this.toggleEdit}>Edit</button>
                                </div>
                            }
                        </div>
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

export default connect(mapStateToProps, { getUser, updateUser })(User)