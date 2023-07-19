//import { StatusOnlineIcon } from "@heroicons/react/outline";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

export default function TableFromChart({ data }: { data: any[] }) {


  let headers: any[] = [];

  if (data.length > 0) {
    headers = Object.keys(data[0]);
  }

  console.log(headers);
  return (
  
      <Table className="h-fit overflow-auto">
        <TableHead>
          <TableRow>
            {headers.map((header, i) => (
              <TableHeaderCell key={i}>{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.name}>
              {/* <TableCell>{item.name}</TableCell>
              <TableCell>
                <Text>{item.Role}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.departement}</Text>
              </TableCell> */}
              {headers.map((header, i) => (
                <TableCell key={i}>{item[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
