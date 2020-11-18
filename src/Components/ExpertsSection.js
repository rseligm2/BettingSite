import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


export default function ExpertsSection(props){

    const data = [
        {name: 'Russell', percent: 60, units: 10.5},
        {name: 'Michael', percent: 58, units: 10.2},
        {name: 'Arty', percent: 55, units: 9.8}
    ]

    return(<div>
            <header>
                <h1>Top Experts</h1>
            </header>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">W/L%</TableCell>
                            <TableCell align="right">Units</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) =>(
                            <TableRow key={i} >
                                <TableCell>{row.name}</TableCell>
                                <TableCell align="right">{row.percent}</TableCell>
                                <TableCell align="right">{row.units}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}