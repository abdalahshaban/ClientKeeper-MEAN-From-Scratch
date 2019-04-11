import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/add';

// import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClientServicesService {
	private url = 'http://localhost:3000/';
	constructor(private http: HttpClient) {}

	getClient() {
		return this.http.get(this.url + 'api/clients');
	}

	saveClient(client) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		console.log(headers);

		return this.http.post(this.url + 'api/clients', client, { headers: headers });
		// return this.http.post(this.url + 'api/clients', client);
	}

	updateClient(client) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		console.log(headers);

		return this.http.put(this.url + 'api/clients/' + client._id, client, { headers: headers });
		// return this.http.put(this.url + 'api/clients'+ client._id, client, client);
	}

	deleteClient(id) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		console.log(headers);

		return this.http.delete(this.url + 'api/clients/' + id, { headers: headers });
		// return this.http.delete(this.url + 'api/clients'+ id, client);
	}
}
