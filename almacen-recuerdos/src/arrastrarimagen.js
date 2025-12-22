import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function SubirFoto() {
  const onDrop = useCallback(acceptedFiles => {
    // Aquí recibes los archivos y puedes enviarlos a tu servidor Node/Express
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/*': []}, // Solo acepta imágenes
    multiple: false          // Solo una foto a la vez
  });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>¡Suelta la imagen aquí!</p> :
          <p>Arrastra tu mejor foto o haz clic para seleccionarla</p>
      }
    </div>
  );
}

const styles = {
  dropzone: {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer'
  }
};