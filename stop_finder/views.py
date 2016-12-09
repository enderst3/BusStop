from django.shortcuts import render


def stop_finder(request):

    context = {}

    return render(request, 'secrets.html', context)
