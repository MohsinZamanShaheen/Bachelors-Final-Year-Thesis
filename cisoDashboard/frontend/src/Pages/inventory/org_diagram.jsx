import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import { OrganizationChart } from 'primereact/organizationchart';
import {Box} from '@mui/material';
import Header from '../../Components/global/Header';
import CircularProgress from '@mui/material/CircularProgress';
import {getOrganizationChart} from "../../apiClient";

const sanitizeData = (data) => {
    if (!data) return [];

    const sanitizeNode = (node) => {
        if (!node) return null;
        return {
            id: node.id || Math.random().toString(36).substr(2, 9), // Generate a random id if null
            type: node.type || 'unknown',
            label: node.label || 'Unknown',
            data: {
                image: node.data?.image || '',
                name: node.data?.name || 'Unknown',
                title: node.data?.title || ''
            },
            children: (node.children || []).map(sanitizeNode),
            expanded: node.expanded || false,
        };
    };

    return data.map(sanitizeNode);
};

export default function OrganizationChartCustom() {
    const [selection, setSelection] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getOrganizationChart();
                const sanitizedData = sanitizeData(result.data);
                setData(sanitizedData);

            } catch (error) {
                console.error('Error fetching organization data:', error);
            }
        };
        fetchData();
    }, []);

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
                {data ? (
                    <OrganizationChart
                        value={data}
                        selectionMode="multiple"
                        selection={selection}
                        onSelectionChange={(e) => setSelection(e.data)}
                        nodeTemplate={nodeTemplate}
                    />
                ) : (
                    <Box sx={{ display: 'flex' }}>
                        <h1>Hello</h1>
                        <CircularProgress />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
        