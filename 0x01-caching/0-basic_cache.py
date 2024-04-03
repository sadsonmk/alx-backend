#!/usr/bin/env python3
"""A module for a class BasicCache that inherits
    from BaseCaching and is a caching system
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """A class that inherits from the basecaching class"""
    def __init__(self):
        """initializes attributes"""
        super().__init__()

    def put(self, key, item):
        """The method which assign to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """return the value in self.cache_data linked to key or none"""
        if key is None or self.cache_data.get(key) is None:
            return None
        return self.cache_data.get(key)
