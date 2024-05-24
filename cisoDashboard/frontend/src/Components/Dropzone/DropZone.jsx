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

const DropZoneComp = ({setPhoto}) => {
  const [files, setFiles] = React.useState([]);
  const hiddenInput = React.useRef(null);

  const onFilePickerChange = (event) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    setFiles([file]);
    setPhoto(file);
  };
  const readFileAsDataURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setPhoto({ data: base64data.split(',')[1], type: file.type });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box m={4}>
      <DropZone
        acceptedFileTypes={acceptedFileTypes}
        onDropComplete={({ acceptedFiles, rejectedFiles }) => {
          const file = acceptedFiles[0];
          setFiles([file]);
          setPhoto(file);
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