export const nodes = [
  { id: '1', type: 'transparent', position: { x: 0, y: 250 }, data: { label: 'Firewall', type: 'firewall',  imageUrl: '../../assets/firewall2.png'  }},
  { id: '2', type: 'transparent', position: { x: 180, y: 250 }, data: { label: 'Router', type: 'router',  imageUrl: '../../assets/router.png'  }},
  { id: '4', type: 'transparent', position: { x: 0, y: 400 }, data: { label: 'Switch', type: 'switch',  imageUrl: '../../assets/switch.png'  }},
  { id: '5', type: 'transparent', position: { x: 0, y: 100 }, data: { label: 'Switch', type: 'switch',  imageUrl: '../../assets/switch.png'  }},
  { id: '6', type: 'transparent', position: { x: -120, y: 500 }, data: { label: 'Server', type: 'server',  imageUrl: '../../assets/applicationServer.png'  }},
  { id: '7', type: 'transparent', position: { x: -300, y: 250 }, data: { label: 'Cloud', type: 'cloud',  imageUrl: '../../assets/cloud.png'  }},
  { id: '8', type: 'transparent', position: { x: 80, y: 75 }, data: { label: 'Backup', type: 'backup',  imageUrl: '../../assets/dbserver.png'  }, parentId: '2-1',extent: 'parent'},
  { id: '9', type: 'transparent', position: { x: 40, y: 100 }, data: { label: 'Server', type: 'server',  imageUrl: '../../assets/applicationServer.png'  }, parentId: '2-2',extent: 'parent'},
  { id: '10', type: 'transparent', position: { x: 150, y: 100 }, data: { label: 'Server', type: 'server',  imageUrl: '../../assets/applicationServer.png'  }, parentId: '2-2',extent: 'parent'},
  { id: '11', type: 'transparent', position: { x: 250, y: 100 }, data: { label: 'Server', type: 'server',  imageUrl: '../../assets/applicationServer.png'  }, parentId: '2-2',extent: 'parent'},
  { id: '12', type: 'transparent', position: { x: -150, y: 250 }, data: { label: 'Modem', type: 'modem',  imageUrl: '../../assets/modem.png'  }},
  { id: '13', type: 'transparent', position: { x: 120, y: 500 }, data: { label: 'Desktop PC', type: 'pc',  imageUrl: '../../assets/pcsetup.png'  }},
  { id: '14', type: 'transparent', position: { x: 300, y: 300 }, data: { label: 'Laptop', type: 'laptop',  imageUrl: '../../assets/laptop.png'  }},
  { id: '15', type: 'transparent', position: { x: 300, y: 450 }, data: { label: 'FAX', type: 'fax',  imageUrl: '../../assets/fax.png'  }},
  {
    id: '2-1',
    type: 'group',
    position: {
      x: 400,
      y: 50,
    },
    data: {label: 'Backup Servers'},
    style: {
      width: 200,
      height: 180,
      color: 'black',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: '2px dashed #ccc',
    },
  },
  {
    id: '2-2',
    type: 'group',
    position: {
      x: -120,
      y: -80,
    },
    data: {label: 'Isolation Region'},
    style: {
      width: 350,
      height: 250,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: '2px dashed #ccc',
    },
  },
  
 
  

];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', sourceHandle: 'fa',},
  { id: 'e1-12', source: '1', target: '12', sourceHandle: 'fb',},
  { id: 'e1-5', source: '1', target: '5', sourceHandle: 'fc'},
  { id: 'e1-4', source: '1', target: '4',sourceHandle: 'fd'},
  { id: 'e4-6', source: '4', target: '6',sourceHandle: 'sb'},
  { id: 'e7-12', source: '7', target: '12'},
  { id: 'e5-9', source: '5', target: '9', sourceHandle: 'sb'},
  { id: 'e5-10', source: '5', target: '10', sourceHandle: 'sc'},
  { id: 'e5-11', source: '5', target: '11', sourceHandle: 'sa'},
  { id: 'e4-13', source: '4', target: '13',sourceHandle: 'sd'},
  { id: 'e2-14', source: '2', target: '14'},
  { id: 'e14-15', source: '14', target: '15'},


];
/*
export const nodes = [
  {
    id: 'annotation-1',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 1,
      label:
        'Built-in node and edge types. Draggable, deletable and connectable!',
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-30px,10px) rotate(-80deg)',
      },
    },
    position: { x: -80, y: -30 },
  },
  {
    id: '1-1',
    type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: '1-2',
    type: 'default',
    data: {
      label: 'Default Node',
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '1-3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    position: { x: 300, y: 100 },
  },
  {
    id: 'annotation-2',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 2,
      label: 'Sub flows, toolbars and resizable nodes!',
      arrowStyle: {
        left: 0,
        bottom: 0,
        transform: 'translate(5px, 25px) scale(1, -1) rotate(100deg)',
      },
    },
    position: { x: 220, y: 200 },
  },
  {
    id: '2-1',
    type: 'group',
    position: {
      x: -170,
      y: 250,
    },
    style: {
      width: 380,
      height: 180,
      backgroundColor: 'rgba(208, 192, 247, 0.2)',
    },
  },
  {
    id: '2-2',
    data: {
      label: 'Node with Toolbar',
    },
    type: 'tools',
    position: { x: 50, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: '2-3',
    type: 'resizer',
    data: {
      label: 'resizable node',
    },
    position: { x: 250, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
      color: 'white',
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: 'annotation-3',
    type: 'annotation',
    draggable: false,
    selectable: false,
    data: {
      level: 3,
      label: <>Nodes and edges can be anything and are fully customizable!</>,
      arrowStyle: {
        right: 0,
        bottom: 0,
        transform: 'translate(-35px, 20px) rotate(-80deg)',
      },
    },
    position: { x: -40, y: 570 },
  },
  {
    id: '3-2',
    type: 'textinput',
    position: { x: 150, y: 650 },
    data: {},
  },
  {
    id: '3-1',
    type: 'circle',
    position: { x: 350, y: 500 },
    data: {},
  },
];
*/

/*
export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2-2',
    target: '2-3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-3',
    source: '2-3',
    sourceHandle: 'a',
    target: '3-2',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '2-3',
    sourceHandle: 'b',
    target: '3-1',
    type: 'button',
    style: { strokeWidth: 2 },
  },
];

*/
