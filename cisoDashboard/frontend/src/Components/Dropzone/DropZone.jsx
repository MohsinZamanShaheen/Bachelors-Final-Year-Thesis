import * as React from 'react';
import { Box } from '@mui/material';
import {
  Button,
  DropZone,
  Flex,
  Text,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

const acceptedFileTypes = ['image/png', 'image/jpeg'];

const DropZoneComp = () => {
  const [files, setFiles] = React.useState([]);
  const hiddenInput = React.useRef(null);

  const onFilePickerChange = (event) => {
    const { files } = event.target;
    if (!files || files.length === 0) {
      return;
    }
    setFiles(Array.from(files));
  };

  return (
    <Box m={4}>
      <DropZone
        acceptedFileTypes={acceptedFileTypes}
        onDropComplete={({ acceptedFiles, rejectedFiles }) => {
          setFiles(acceptedFiles);
        }}
      >
        <Flex direction="column" alignItems="center">
          <Text>Click to upload or drag and drop</Text>
          <Text>SVG, PNG, JPG or GIF</Text>
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