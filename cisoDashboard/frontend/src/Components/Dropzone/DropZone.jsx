import * as React from 'react';
import { Box } from '@mui/material';
import {
  Button,
  DropZone,
  Flex,
  Text,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

const acceptedFileTypes = ['image/png','image/jpg', 'image/jpeg'];

const DropZoneComp = () => {
  const [files, setFiles] = React.useState([]);
  const hiddenInput = React.useRef(null);

  const onFilePickerChange = (event) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setFiles(Array.from(files));
    handleFileUpload(files[0]);
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setPhoto(formData);
  };

  return (
    <Box m={4}>
      <DropZone
        acceptedFileTypes={acceptedFileTypes}
        onDropComplete={({ acceptedFiles, rejectedFiles }) => {
          setFiles(acceptedFiles);
          if (acceptedFiles.length > 0) {
            handleFileUpload(acceptedFiles[0]);
          }
        }}
      >
        <Flex direction="column" alignItems="center">
          <Text>Click to upload or drag and drop</Text>
          <Text>PNG, JPG or JPEG</Text>
          <Text>max size (15MB)</Text>
          <Button size="small" onClick={() => hiddenInput.current.click()}>
            Browse
          </Button>
        </Flex>
        <VisuallyHidden>
          <input
            type="file"
            tabIndex={-1}
            ref={hiddenInput}
            onChange={onFilePickerChange}
            multiple={true}
            accept={acceptedFileTypes.join(',')}
          />
        </VisuallyHidden>
      </DropZone>
      {files.map((file) => (
        <Text color={"red"} key={file.name}>{file.name}</Text>
      ))}
    </Box>
  );
}

export default DropZoneComp;