import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import { OrganizationChart } from 'primereact/organizationchart';
import {Box} from '@mui/material';
import Header from '../../Components/global/Header';

export default function OrganizationChartCustom() {
    const [selection, setSelection] = useState([]);
    const [data] = useState([
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    label: 'Development',
                    children:[
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                                name: 'Anna Fali',
                                title: 'CMO'
                            },
                        },
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                                name: 'Stephen Shaw',
                                title: 'CTO'
                            },
                        }
                    ]
                },
                {
                    label: 'UI/UX Design',
                    children:[
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                                name: 'Anna Fali',
                                title: 'CMO'
                            },
                        },
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                                name: 'Stephen Shaw',
                                title: 'CTO'
                            },
                            children: [
                                {
                                    expanded: true,
                                    type: 'person',
                                    data: {
                                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                                        name: 'Anna Fali',
                                        title: 'CMO'
                                    },
                                },
                                {
                                    expanded: true,
                                    type: 'person',
                                    data: {
                                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                                        name: 'Stephen Shaw',
                                        title: 'CTO'
                                    },
                                }
                            ]
                        }
                    ]
                },                      
                {
                    label: 'Sales',
                    children:[
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                                name: 'Anna Fali',
                                title: 'CMO'
                            },
                        },
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                                name: 'Stephen Shaw',
                                title: 'CTO'
                            },
                        }
                    ]
                },
                {
                    label: 'Marketing',
                    children:[
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                                name: 'Anna Fali',
                                title: 'CMO'
                            },
                        },
                        {
                            expanded: true,
                            type: 'person',
                            data: {
                                image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                                name: 'Stephen Shaw',
                                title: 'CTO'
                            },
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img 
                        alt={node.data.name} 
                        src={node.data.image} 
                        style={{
                            width: '3rem', 
                            height: '3rem', 
                            marginBottom: '0.5rem', 
                            borderRadius: '50%'
                        }} 
                    />
                    <span style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{node.data.name}</span>
                    <span>{node.data.title}</span>
                </Box>
            );
        }
    
        return node.label;
    };

    return (
        <Box>
            <Box m="20px">
                <Header
                title="Organization Diagram"
                subtitle="Summary of the organization's structure and reporting relationships."
                />
            </Box>
            <Box className="card overflow-x-auto">
                <OrganizationChart value={data} selectionMode="multiple" selection={selection} onSelectionChange={(e) => setSelection(e.data)} nodeTemplate={nodeTemplate} />
            </Box>
        </Box>
    )
}
        