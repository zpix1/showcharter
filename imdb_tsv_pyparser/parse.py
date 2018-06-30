from collections import defaultdict
import json

show_list = {"tt0944947","tt0903747","tt2861424","tt1475582","tt0417299","tt0877057","tt0213338","tt0285403"}#set(json.load(open('showdata.json')).keys())

def safe_cast(val, to_type=int, default=None):
    try:
        return to_type(val)
    except (ValueError, TypeError):
        return default

episode2name = {}
with open('basics.tsv') as f:
    for l in f:
        episode, trash, name = l.strip().split("\t")[:3]
        episode2name[episode] = name

with open('showdata.json', 'w') as f:
    f.write(json.dumps({id: episode2name[id] for id in show_list}))

episode2rating = {}
with open('rats.tsv') as f:
    for l in f:
        episode, rating = l.strip().split("\t")[:2]
        episode2rating[episode] = float(rating)

show2episodes = defaultdict(lambda: defaultdict(dict))
with open('eps.tsv') as f:
    for l in f:
        episode, parent, seasonN, episodeN = l.strip().split("\t")[:4]
        if parent in show_list:
            show2episodes[parent][safe_cast(seasonN, default=0)][safe_cast(episodeN, default=0)] = (episode2name.get(episode, ''), episode2rating.get(episode, 0.0))
# print(show2episodes)

for show in show_list:
    for season in show2episodes[show]:
        show2episodes[show][season] = list(map(lambda x: x[1], sorted(show2episodes[show][season].items())))
    show2episodes[show] = list(map(lambda x: x[1], sorted(show2episodes[show].items())))

with open('output.json', 'w') as f:
    f.write(json.dumps(show2episodes))