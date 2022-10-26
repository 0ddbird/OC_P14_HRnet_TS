import React, { useState } from 'react'
import PropTypes from 'prop-types'
import UploadIcon from '../../assets/upload.svg'
import Modal from '../Modal'

const Uploader = ({ setFile }): JSX.Element => {
  const [currentFile, setCurrentFile] = useState(undefined)
  const [modalDisplayed, setModalDisplayed] = useState(false)
  const modalContent = 'File uploaded successfuly'
  function handleFormSubmit (e): void {
    e.preventDefault()
    if (!currentFile) return
    setFile(currentFile)
    setModalDisplayed(true)
    setCurrentFile(undefined)
  }

  function handleInputChange (e): void {
    const fileReader = new FileReader()
    fileReader.readAsText(e.target.files[0], 'UTF-8')

    fileReader.onload = e => {
      setCurrentFile(JSON.parse(e.target.result))
    }
  }

  return (
    <div className='uploader'>
      <img src={UploadIcon} alt='importer un fichier JSON' className='upload-icon'/>
      <form id='upload-form' onSubmit={handleFormSubmit}>
        <label htmlFor='file-input'>Importer plusieurs profils en JSON</label>
        <input id='file-input' accept='.json' type='file' onChange={handleInputChange} />
        <button type='submit' className={currentFile ? 'submit-button' : 'submit-button inactive'}>Envoyer</button>
      </form>
    <Modal title="Success" content={modalContent} modalDisplayed={modalDisplayed} setModalDisplayed={setModalDisplayed}/>
    </div>

  )
}

Uploader.propTypes = {
  setFile: PropTypes.func
}

export default Uploader
