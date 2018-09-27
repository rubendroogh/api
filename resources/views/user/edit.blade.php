@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Gebruiker: {{ Auth::User()->name }}</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                @if ($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            </div>
            <div class="col-12">
                <form action="{{ route('updateUser') }}" method="POST">
                    @csrf
                    <div class="form-group">
                        <label for="nameInput">Naam:</label>
                        <input id="nameInput" type="text" name="name" class="form-control" value="{{ Auth::User()->name }}">
                    </div>
                    <input type="submit" class="btn btn-chatboy" value="Update gegevens">
                </form>
            </div>
        </div>
    </div>
@endsection
