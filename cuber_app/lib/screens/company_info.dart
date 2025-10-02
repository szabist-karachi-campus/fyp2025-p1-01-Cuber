import 'package:flutter/material.dart';
//import 'package:image_picker/image_picker.dart';
import 'dart:io';

class CompanyInfoPage extends StatefulWidget {
  @override
  _CompanyInfoPageState createState() => _CompanyInfoPageState();
}

class _CompanyInfoPageState extends State <CompanyInfoPage> {
  final _formKey = GlobalKey<FormState>();
  String _companyName = '';
  String _companyAddress = '';
  String _companyPhone = '';
  String _cuisine = '';
  File? _companyLogo;


  //final ImagePicker _picker = ImagePicker();
  //Future<void> _pickImage() async {
    //final XFile? image = await _picker.pickImage(source: ImageSource.gallery);
    //if (image != null) {
      //File file = File(image.path);
    //}
 // }


  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Caterer signed up')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Company Info'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                decoration: InputDecoration(labelText: 'Company Name'),
                validator: (value) => value!.isEmpty ? 'PLease enter company name' : null,
                onSaved: (value) => _companyName = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Company Address'),
                validator: (value) =>
                value!.isEmpty ? 'Please enter company address' : null,
                onSaved: (value) => _companyAddress = value!,
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Company Phone'),
                validator: (value) =>
                value!.isEmpty ? 'Please enter company phone' : null,
                onSaved: (value) => _companyPhone = value!,
              ),
              SizedBox(height: 20),
              _companyLogo == null
                  ? Text('no logo selected')
                  : Image.file(_companyLogo!, height: 100),
              SizedBox(height: 20),

              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _submit,
                child: Text('Submit'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}