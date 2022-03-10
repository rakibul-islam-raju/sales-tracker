from rest_framework import pagination
from rest_framework.pagination import _positive_int
from rest_framework.response import Response


class CustomPagination(pagination.PageNumberPagination):
    def get_limit(self, request):
        if self.limit_query_param:
            try:
                return _positive_int(
                    request.query_params[self.limit_query_param],
                    strict=True,
                    cutoff=self.max_limit,
                )
            except (KeyError, ValueError) as e:
                raise e  # Re-raise the caught exception

        return self.default_limit

    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
            }
        )
