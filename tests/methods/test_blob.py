import responses

from jmapc import Blob, Client
from jmapc.methods import BlobGet, BlobGetResponse

from ..utils import expect_jmap_call


def test_blob_get(
    client: Client, http_responses: responses.RequestsMock
) -> None:
    expected_request = {
        "methodCalls": [
            [
                "Blob/get",
                {"accountId": "u1138", "ids": ["C2187", "C3PO"]},
                "single.Blob/get",
            ]
        ],
        "using": [
            "urn:ietf:params:jmap:blob",
            "urn:ietf:params:jmap:core",
        ],
    }
    response = {
        "methodResponses": [
            [
                "Blob/get",
                {
                    "accountId": "u1138",
                    "list": [
                        {
                            "blobId": "C2187",
                            "type": "text/plain",
                            "size": 42,
                        },
                    ],
                    "notFound": ["C3PO"],
                },
                "single.Blob/get",
            ]
        ]
    }
    expect_jmap_call(http_responses, expected_request, response)
    assert client.request(BlobGet(ids=["C2187", "C3PO"])) == BlobGetResponse(
        account_id="u1138",
        not_found=["C3PO"],
        data=[
            Blob(
                id="C2187",
                type="text/plain",
                size=42,
            )
        ],
    )


def test_blob_get_no_ids(
    client: Client, http_responses: responses.RequestsMock
) -> None:
    expected_request = {
        "methodCalls": [
            ["Blob/get", {"accountId": "u1138"}, "single.Blob/get"]
        ],
        "using": [
            "urn:ietf:params:jmap:blob",
            "urn:ietf:params:jmap:core",
        ],
    }
    response = {
        "methodResponses": [
            [
                "Blob/get",
                {
                    "accountId": "u1138",
                    "list": [
                        {
                            "blobId": "C2187",
                            "type": "text/plain",
                            "size": 42,
                        },
                        {
                            "blobId": "C3PO",
                            "type": "application/json",
                            "size": 100,
                        },
                    ],
                    "notFound": [],
                },
                "single.Blob/get",
            ]
        ]
    }
    expect_jmap_call(http_responses, expected_request, response)
    assert client.request(BlobGet()) == BlobGetResponse(
        account_id="u1138",
        not_found=[],
        data=[
            Blob(
                id="C2187",
                type="text/plain",
                size=42,
            ),
            Blob(
                id="C3PO",
                type="application/json",
                size=100,
            ),
        ],
    )
