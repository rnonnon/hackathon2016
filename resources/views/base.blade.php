
<html ng-app="trip" ng-strict-di>
<head>
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