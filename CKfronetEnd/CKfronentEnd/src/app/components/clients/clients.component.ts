import { ClientServicesService } from './../../services/client-services.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrls: [ './clients.component.css' ]
})
export class ClientsComponent implements OnInit {
	clients;
	_id;
	first_name;
	last_name;
	email;
	phone;
	isEdit;

	constructor(private clientser: ClientServicesService) {}

	onAddSubmit() {
		console.log('in submit');

		let newClient = {
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
			phone: this.phone
		};

		this.clientser.saveClient(newClient).subscribe((client) => {
			console.log(client);
			this.clients.push(client);
			this.first_name = '';
			this.last_name = '';
			this.email = '';
			this.phone = '';
		});
	}

	onEditClick(client) {
		this.isEdit = true;
		this.first_name = client.first_name;
		this.last_name = client.last_name;
		this.email = client.email;
		this.phone = client.phone;
		this._id = client._id;
	}

	onEditSubmit() {
		let updClient = {
			first_name: this.first_name,
			last_name: this.last_name,
			email: this.email,
			phone: this.phone,
			_id: this._id
		};

		this.clientser.updateClient(updClient).subscribe((client) => {
			for (let i = 0; i < this.clients.length; i++) {
				if (client['id'] == this.clients[i]._id) {
					this.clients.splice(i, 1);
				}
			}
			console.log(client);

			this.clients.push(client);
			this.myfun();
		});
	}

	onDeleteClick(id) {
		this.clientser.deleteClient(id).subscribe((client) => {
			// console.log(client);
			this.myfun();
		});
	}

	myfun() {
		this.clientser.getClient().subscribe(
			(clients) => {
				this.clients = clients;
				// console.log(clients);
			},
			(error) => {
				console.log(error);
			}
		);
	}

	ngOnInit() {
		this.myfun();

		this.isEdit = false;
	}
}
