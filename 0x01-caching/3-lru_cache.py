#!/usr/bin/env python3
"""This is a module which implements the Least Recently Used
    cache replacement algorithm
"""

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """The class which implements the LRU cache algorithm
        extending the BaseCaching class
    """
    def __init__(self):
        """initializes the cache"""
        super().__init__()
        self.lru_order = []

    def put(self, key, item):
        """assigns to the dictionary self.cache_data
            the item value for the key key
        """
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.lru_order.remove(key)
        elif len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            least_key = self.lru_order.pop(0)
            print(f"DISCARD: {least_key}")
            del self.cache_data[least_key]
        self.cache_data[key] = item
        self.lru_order.append(key)

    def get(self, key):
        """returns the value in self.cache_data linked to key"""
        if key is None or self.cache_data.get(key) is None:
            return None
        self.lru_order.remove(key)
        self.lru_order.append(key)
        return self.cache_data.get(key)
