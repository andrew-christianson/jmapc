from __future__ import annotations

from dataclasses import dataclass, field
from typing import Optional

from dataclasses_json import config

from .. import constants
from ..models import Blob, ListOrRef
from .base import Get, GetResponseWithoutState


class BlobBase:
    method_namespace: Optional[str] = "Blob"
    using = {constants.JMAP_URN_BLOB}


@dataclass
class BlobGet(BlobBase, Get):
    ids: Optional[ListOrRef[str]] = None


@dataclass
class BlobGetResponse(BlobBase, GetResponseWithoutState):
    data: list[Blob] = field(metadata=config(field_name="list"))
