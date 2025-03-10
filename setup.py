"""
Personal website portfolio python package configuration.
"""

from setuptools import setup

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name='portfolio',
    version='0.1.0',
    packages=['porto'],
    author="Thomas Dokas",
    author_email="dokastho@umich.edu",
    url="https://github.com/dokastho/homepage",
    description="A fresh take on what a homepage can do",
    long_description=long_description,
    long_description_content_type="text/markdown",
    include_package_data=True,
    install_requires=[
        'flask',
        'flask_cors',
        'arrow',
    ],
    python_requires='>=3.6',
)
