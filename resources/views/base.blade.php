
<html ng-app="trip" ng-strict-di>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/">
    <title>App Name - @yield('title')</title>
    <script type="text/javascript" src="{{ URL::asset('js/main.js') }}"></script>
    <script type="text/javascript" src="{{ URL::asset('js/output.js') }}"></script>
    <link rel="stylesheet" href="{{ URL::asset('css/main.css') }}" />

</head>
<body>
@yield('content')

</body>
</html>