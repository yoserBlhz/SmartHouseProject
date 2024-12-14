import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';


interface Device {
  name: string;
  isOn: boolean;
}





@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule,MatInputModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'], // Corrected property name (from styleUrl to styleUrls)
})
export class TestComponent implements AfterViewInit {
  temperature: number = 21;
  humidity: number = 20;
  gasLevel: number = 400;

  searchQuery: string = '';
  devices: Device[] = [
    { name: 'Laptop', isOn: false },
    { name: 'Smartphone', isOn: true },
    { name: 'Tablet', isOn: false },
    { name: 'Smartwatch',  isOn: true },
    { name: 'Laptop',  isOn: false },
    { name: 'Smartphone',  isOn: true },
    { name: 'Tablet',  isOn: false },
    { name: 'Smartwatch',  isOn: true },
    { name: 'Laptop',  isOn: false },
    { name: 'Smartphone',  isOn: true },
    { name: 'Tablet',  isOn: false },
    { name: 'Smartwatch',  isOn: true },
  ];

  displayedColumns: string[] = ['name', 'isOn'];
  dataSource: MatTableDataSource<Device>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(this.devices);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchQuery = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleDevice(device: Device) {
    device.isOn = !device.isOn;
    this.dataSource.data = [...this.devices]; 
  }

  
  adjustTemperature(change: number): void {
    this.temperature += change;
  }
}
