import 'package:flutter/material.dart';
import 'company_info.dart';

class UserInfoPage extends StatefulWidget {
  @override
  _UserInfoPageState createState() => _UserInfoPageState();
}

class _UserInfoPageState extends State<UserInfoPage> {
  final _formKey = GlobalKey<FormState>();
  String _name = '';
  String _cnic = '';
  String _phone = '';
  String _email = '';
  String _password = '';
  String _address = '';
  String _userType = 'Customer';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('User Info'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Name'),
                validator: (value) => value!.isEmpty ? 'Please enter your name' : null,
                onSaved: (value) => _name = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'CNIC'),
                validator: (value) => value!.isEmpty ? 'Please enter cnic' : null,
                onSaved: (value) => _cnic = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Phone'),
                validator: (value) => value!.isEmpty ? 'Please enter phone number' : null,
                onSaved: (value) => _phone = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                validator: (value) => value!.isEmpty ? 'Please enter your email' : null,
                onSaved: (value) => _email = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
                validator: (value) => value!.isEmpty ? 'Please enter password' : null,
                onSaved: (value) => _password = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Address'),
                validator: (value) => value!.isEmpty ? 'Please enter address' : null,
                onSaved: (value) => _address = value!,
              ),
              DropdownButtonFormField<String>(
                value: _userType,
                items: ['Customer', 'Caterer'].map((String category) {
                  return DropdownMenuItem<String>(
                    value: category,
                    child: Text(category),
                  );
                }).toList(),
                onChanged: (newValue) {
                  setState(() {
                    _userType: newValue!;
                  });
                },
                decoration: InputDecoration(labelText: 'User Type'),
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    if (_userType == 'Customer') {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Customer signed up')),
                      );
                    } else {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => CompanyInfoPage()),
                      );
                    }
                  }
                },
                child: Text(_userType == 'Customer' ? 'Submit' : 'Next'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}