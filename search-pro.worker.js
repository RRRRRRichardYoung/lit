const V=Object.entries,et=Object.fromEntries,st="ENTRIES",L="KEYS",T="VALUES",_="";class D{set;_type;_path;constructor(t,s){const n=t._tree,o=Array.from(n.keys());this.set=t,this._type=s,this._path=o.length>0?[{node:n,keys:o}]:[]}next(){const t=this.dive();return this.backtrack(),t}dive(){if(this._path.length===0)return{done:!0,value:void 0};const{node:t,keys:s}=E(this._path);if(E(s)===_)return{done:!1,value:this.result()};const n=t.get(E(s));return this._path.push({node:n,keys:Array.from(n.keys())}),this.dive()}backtrack(){if(this._path.length===0)return;const t=E(this._path).keys;t.pop(),!(t.length>0)&&(this._path.pop(),this.backtrack())}key(){return this.set._prefix+this._path.map(({keys:t})=>E(t)).filter(t=>t!==_).join("")}value(){return E(this._path).node.get(_)}result(){switch(this._type){case T:return this.value();case L:return this.key();default:return[this.key(),this.value()]}}[Symbol.iterator](){return this}}const E=e=>e[e.length-1],nt=(e,t,s)=>{const n=new Map;if(t===void 0)return n;const o=t.length+1,u=o+s,i=new Uint8Array(u*o).fill(s+1);for(let r=0;r<o;++r)i[r]=r;for(let r=1;r<u;++r)i[r*o]=r;return R(e,t,s,n,i,1,o,""),n},R=(e,t,s,n,o,u,i,r)=>{const d=u*i;t:for(const c of e.keys())if(c===_){const a=o[d-1];a<=s&&n.set(r,[e.get(c),a])}else{let a=u;for(let h=0;h<c.length;++h,++a){const g=c[h],m=i*a,p=m-i;let l=o[m];const f=Math.max(0,a-s-1),y=Math.min(i-1,a+s);for(let F=f;F<y;++F){const v=g!==t[F],z=o[p+F]+ +v,A=o[p+F+1]+1,w=o[m+F]+1,j=o[m+F+1]=Math.min(z,A,w);j<l&&(l=j)}if(l>s)continue t}R(e.get(c),t,s,n,o,a,i,r+c)}};class C{_tree;_prefix;_size=void 0;constructor(t=new Map,s=""){this._tree=t,this._prefix=s}atPrefix(t){if(!t.startsWith(this._prefix))throw new Error("Mismatched prefix");const[s,n]=x(this._tree,t.slice(this._prefix.length));if(s===void 0){const[o,u]=O(n);for(const i of o.keys())if(i!==_&&i.startsWith(u)){const r=new Map;return r.set(i.slice(u.length),o.get(i)),new C(r,t)}}return new C(s,t)}clear(){this._size=void 0,this._tree.clear()}delete(t){return this._size=void 0,ot(this._tree,t)}entries(){return new D(this,st)}forEach(t){for(const[s,n]of this)t(s,n,this)}fuzzyGet(t,s){return nt(this._tree,t,s)}get(t){const s=k(this._tree,t);return s!==void 0?s.get(_):void 0}has(t){const s=k(this._tree,t);return s!==void 0&&s.has(_)}keys(){return new D(this,L)}set(t,s){if(typeof t!="string")throw new Error("key must be a string");return this._size=void 0,I(this._tree,t).set(_,s),this}get size(){if(this._size)return this._size;this._size=0;const t=this.entries();for(;!t.next().done;)this._size+=1;return this._size}update(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);return n.set(_,s(n.get(_))),this}fetch(t,s){if(typeof t!="string")throw new Error("key must be a string");this._size=void 0;const n=I(this._tree,t);let o=n.get(_);return o===void 0&&n.set(_,o=s()),o}values(){return new D(this,T)}[Symbol.iterator](){return this.entries()}static from(t){const s=new C;for(const[n,o]of t)s.set(n,o);return s}static fromObject(t){return C.from(Object.entries(t))}}const x=(e,t,s=[])=>{if(t.length===0||e==null)return[e,s];for(const n of e.keys())if(n!==_&&t.startsWith(n))return s.push([e,n]),x(e.get(n),t.slice(n.length),s);return s.push([e,t]),x(void 0,"",s)},k=(e,t)=>{if(t.length===0||e==null)return e;for(const s of e.keys())if(s!==_&&t.startsWith(s))return k(e.get(s),t.slice(s.length))},I=(e,t)=>{const s=t.length;t:for(let n=0;e&&n<s;){for(const u of e.keys())if(u!==_&&t[n]===u[0]){const i=Math.min(s-n,u.length);let r=1;for(;r<i&&t[n+r]===u[r];)++r;const d=e.get(u);if(r===u.length)e=d;else{const c=new Map;c.set(u.slice(r),d),e.set(t.slice(n,n+r),c),e.delete(u),e=c}n+=r;continue t}const o=new Map;return e.set(t.slice(n),o),o}return e},ot=(e,t)=>{const[s,n]=x(e,t);if(s!==void 0){if(s.delete(_),s.size===0)W(n);else if(s.size===1){const[o,u]=s.entries().next().value;q(n,o,u)}}},W=e=>{if(e.length===0)return;const[t,s]=O(e);if(t.delete(s),t.size===0)W(e.slice(0,-1));else if(t.size===1){const[n,o]=t.entries().next().value;n!==_&&q(e.slice(0,-1),n,o)}},q=(e,t,s)=>{if(e.length===0)return;const[n,o]=O(e);n.set(o+t,s),n.delete(o)},O=e=>e[e.length-1],ut=(e,t)=>{const s=e._idToShortId.get(t);if(s!=null)return e._storedFields.get(s)},it=/[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u,M="or",$="and",rt="and_not",ct=(e,t)=>{e.includes(t)||e.push(t)},N=(e,t)=>{for(const s of t)e.includes(s)||e.push(s)},P=({score:e},{score:t})=>t-e,lt=()=>new Map,b=e=>{const t=new Map;for(const s of Object.keys(e))t.set(parseInt(s,10),e[s]);return t},G=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)?e[t]:void 0,ht={[M]:(e,t)=>{for(const s of t.keys()){const n=e.get(s);if(n==null)e.set(s,t.get(s));else{const{score:o,terms:u,match:i}=t.get(s);n.score=n.score+o,n.match=Object.assign(n.match,i),N(n.terms,u)}}return e},[$]:(e,t)=>{const s=new Map;for(const n of t.keys()){const o=e.get(n);if(o==null)continue;const{score:u,terms:i,match:r}=t.get(n);N(o.terms,i),s.set(n,{score:o.score+u,terms:o.terms,match:Object.assign(o.match,r)})}return s},[rt]:(e,t)=>{for(const s of t.keys())e.delete(s);return e}},dt=(e,t,s,n,o,u)=>{const{k:i,b:r,d}=u;return Math.log(1+(s-t+.5)/(t+.5))*(d+e*(i+1)/(e+i*(1-r+r*n/o)))},at=e=>(t,s,n)=>{const o=typeof e.fuzzy=="function"?e.fuzzy(t,s,n):e.fuzzy||!1,u=typeof e.prefix=="function"?e.prefix(t,s,n):e.prefix===!0;return{term:t,fuzzy:o,prefix:u}},H=(e,t,s,n)=>{for(const o of Object.keys(e._fieldIds))if(e._fieldIds[o]===s){e._options.logger("warn",`SlimSearch: document with ID ${e._documentIds.get(t)} has changed before removal: term "${n}" was not present in field "${o}". Removing a document after it has changed can corrupt the index!`,"version_conflict");return}},ft=(e,t,s,n)=>{if(!e._index.has(n)){H(e,s,t,n);return}const o=e._index.fetch(n,lt),u=o.get(t);u==null||u.get(s)==null?H(e,s,t,n):u.get(s)<=1?u.size<=1?o.delete(t):u.delete(s):u.set(s,u.get(s)-1),e._index.get(n).size===0&&e._index.delete(n)},gt={k:1.2,b:.7,d:.5},mt={idField:"id",extractField:(e,t)=>e[t],tokenize:e=>e.split(it),processTerm:e=>e.toLowerCase(),fields:void 0,searchOptions:void 0,storeFields:[],logger:(e,t)=>{typeof console?.[e]=="function"&&console[e](t)},autoVacuum:!0},J={combineWith:M,prefix:!1,fuzzy:!1,maxFuzzy:6,boost:{},weights:{fuzzy:.45,prefix:.375},bm25:gt},pt={combineWith:$,prefix:(e,t,s)=>t===s.length-1},Ft={batchSize:1e3,batchWait:10},U={minDirtFactor:.1,minDirtCount:20},_t={...Ft,...U},K=Symbol("*"),yt=(e,t)=>{const s=new Map,n={...e._options.searchOptions,...t};for(const[o,u]of e._documentIds){const i=n.boostDocument?n.boostDocument(u,"",e._storedFields.get(o)):1;s.set(o,{score:i,terms:[],match:{}})}return s},X=(e,t=M)=>{if(e.length===0)return new Map;const s=t.toLowerCase(),n=ht[s];if(!n)throw new Error(`Invalid combination operator: ${t}`);return e.reduce(n)||new Map},S=(e,t,s,n,o,u,i,r,d=new Map)=>{if(o==null)return d;for(const c of Object.keys(u)){const a=u[c],h=e._fieldIds[c],g=o.get(h);if(g==null)continue;let m=g.size;const p=e._avgFieldLength[h];for(const l of g.keys()){if(!e._documentIds.has(l)){ft(e,h,l,s),m-=1;continue}const f=i?i(e._documentIds.get(l),s,e._storedFields.get(l)):1;if(!f)continue;const y=g.get(l),F=e._fieldLength.get(l)[h],v=dt(y,m,e._documentCount,F,p,r),z=n*a*f*v,A=d.get(l);if(A){A.score+=z,ct(A.terms,t);const w=G(A.match,s);w?w.push(c):A.match[s]=[c]}else d.set(l,{score:z,terms:[t],match:{[s]:[c]}})}}return d},At=(e,t,s)=>{const n={...e._options.searchOptions,...s},o=(n.fields||e._options.fields).reduce((l,f)=>({...l,[f]:G(n.boost,f)||1}),{}),{boostDocument:u,weights:i,maxFuzzy:r,bm25:d}=n,{fuzzy:c,prefix:a}={...J.weights,...i},h=e._index.get(t.term),g=S(e,t.term,t.term,1,h,o,u,d);let m,p;if(t.prefix&&(m=e._index.atPrefix(t.term)),t.fuzzy){const l=t.fuzzy===!0?.2:t.fuzzy,f=l<1?Math.min(r,Math.round(t.term.length*l)):l;f&&(p=e._index.fuzzyGet(t.term,f))}if(m)for(const[l,f]of m){const y=l.length-t.term.length;if(!y)continue;p?.delete(l);const F=a*l.length/(l.length+.3*y);S(e,t.term,l,F,f,o,u,d,g)}if(p)for(const l of p.keys()){const[f,y]=p.get(l);if(!y)continue;const F=c*l.length/(l.length+y);S(e,t.term,l,F,f,o,u,d,g)}return g},Y=(e,t,s={})=>{if(t===K)return yt(e,s);if(typeof t!="string"){const a={...s,...t,queries:void 0},h=t.queries.map(g=>Y(e,g,a));return X(h,a.combineWith)}const{tokenize:n,processTerm:o,searchOptions:u}=e._options,i={tokenize:n,processTerm:o,...u,...s},{tokenize:r,processTerm:d}=i,c=r(t).flatMap(a=>d(a)).filter(a=>!!a).map(at(i)).map(a=>At(e,a,i));return X(c,i.combineWith)},Q=(e,t,s={})=>{const n=Y(e,t,s),o=[];for(const[u,{score:i,terms:r,match:d}]of n){const c=r.length||1,a={id:e._documentIds.get(u),score:i*c,terms:Object.keys(d),queryTerms:r,match:d};Object.assign(a,e._storedFields.get(u)),(s.filter==null||s.filter(a))&&o.push(a)}return t===K&&s.boostDocument==null&&e._options.searchOptions.boostDocument==null||o.sort(P),o},Ct=(e,t,s={})=>{s={...e._options.autoSuggestOptions,...s};const n=new Map;for(const{score:u,terms:i}of Q(e,t,s)){const r=i.join(" "),d=n.get(r);d!=null?(d.score+=u,d.count+=1):n.set(r,{score:u,terms:i,count:1})}const o=[];for(const[u,{score:i,terms:r,count:d}]of n)o.push({suggestion:u,terms:r,score:i/d});return o.sort(P),o};class Et{_options;_index;_documentCount;_documentIds;_idToShortId;_fieldIds;_fieldLength;_avgFieldLength;_nextId;_storedFields;_dirtCount;_currentVacuum;_enqueuedVacuum;_enqueuedVacuumConditions;constructor(t){if(t?.fields==null)throw new Error('SlimSearch: option "fields" must be provided');const s=t.autoVacuum==null||t.autoVacuum===!0?_t:t.autoVacuum;this._options={...mt,...t,autoVacuum:s,searchOptions:{...J,...t.searchOptions||{}},autoSuggestOptions:{...pt,...t.autoSuggestOptions||{}}},this._index=new C,this._documentCount=0,this._documentIds=new Map,this._idToShortId=new Map,this._fieldIds={},this._fieldLength=new Map,this._avgFieldLength=[],this._nextId=0,this._storedFields=new Map,this._dirtCount=0,this._currentVacuum=null,this._enqueuedVacuum=null,this._enqueuedVacuumConditions=U,this.addFields(this._options.fields)}get isVacuuming(){return this._currentVacuum!=null}get dirtCount(){return this._dirtCount}get dirtFactor(){return this._dirtCount/(1+this._documentCount+this._dirtCount)}get documentCount(){return this._documentCount}get termCount(){return this._index.size}toJSON(){const t=[];for(const[s,n]of this._index){const o={};for(const[u,i]of n)o[u]=Object.fromEntries(i);t.push([s,o])}return{documentCount:this._documentCount,nextId:this._nextId,documentIds:Object.fromEntries(this._documentIds),fieldIds:this._fieldIds,fieldLength:Object.fromEntries(this._fieldLength),averageFieldLength:this._avgFieldLength,storedFields:Object.fromEntries(this._storedFields),dirtCount:this._dirtCount,index:t,serializationVersion:2}}addFields(t){for(let s=0;s<t.length;s++)this._fieldIds[t[s]]=s}}const zt=({index:e,documentCount:t,nextId:s,documentIds:n,fieldIds:o,fieldLength:u,averageFieldLength:i,storedFields:r,dirtCount:d,serializationVersion:c},a)=>{if(c!==1&&c!==2)throw new Error("SlimSearch: cannot deserialize an index created with an incompatible version");const h=new Et(a);h._documentCount=t,h._nextId=s,h._documentIds=b(n),h._idToShortId=new Map,h._fieldIds=o,h._fieldLength=b(u),h._avgFieldLength=i,h._storedFields=b(r),h._dirtCount=d||0,h._index=new C;for(const[g,m]of h._documentIds)h._idToShortId.set(m,g);for(const[g,m]of e){const p=new Map;for(const l of Object.keys(m)){let f=m[l];c===1&&(f=f.ds),p.set(parseInt(l,10),b(f))}h._index.set(g,p)}return h},B=(e,t)=>{const s=e.toLowerCase(),n=t.toLowerCase(),o=[];let u=0,i=0;const r=(c,a=!1)=>{let h="";i===0?h=c.length>20?`… ${c.slice(-20)}`:c:a?h=c.length+i>100?`${c.slice(0,100-i)}… `:c:h=c.length>20?`${c.slice(0,20)} … ${c.slice(-20)}`:c,h&&o.push(h),i+=h.length,a||(o.push(["mark",t]),i+=t.length,i>=100&&o.push(" …"))};let d=s.indexOf(n,u);if(d===-1)return null;for(;d>=0;){const c=d+n.length;if(r(e.slice(u,d)),u=c,i>100)break;d=s.indexOf(n,u)}return i<100&&r(e.slice(u),!0),o},wt=(e,t)=>t.contents.reduce((s,[,n])=>s+n,0)-e.contents.reduce((s,[,n])=>s+n,0),xt=(e,t)=>Math.max(...t.contents.map(([,s])=>s))-Math.max(...e.contents.map(([,s])=>s)),Z=(e,t,s={})=>{const n={};return Q(t,e,{boost:{h:2,t:1,c:4},prefix:!0,...s}).forEach(o=>{const{id:u,terms:i,score:r}=o,d=u.includes("@"),c=u.includes("#"),[a,h]=u.split(/[#@]/),g=Number(a),m=i.sort((l,f)=>l.length-f.length).filter((l,f)=>i.slice(f+1).every(y=>!y.includes(l))),{contents:p}=n[g]??={title:"",contents:[]};if(d)p.push([{type:"customField",id:g,index:h,display:m.map(l=>o.c.map(f=>B(f,l))).flat().filter(l=>l!==null)},r]);else{const l=m.map(f=>B(o.h,f)).filter(f=>f!==null);if(l.length&&p.push([{type:c?"heading":"title",id:g,...c&&{anchor:h},display:l},r]),"t"in o)for(const f of o.t){const y=m.map(F=>B(f,F)).filter(F=>F!==null);y.length&&p.push([{type:"text",id:g,...c&&{anchor:h},display:y},r])}}}),V(n).sort(([,o],[,u])=>"max"==="total"?wt(o,u):xt(o,u)).map(([o,{title:u,contents:i}])=>{if(!u){const r=ut(t,o);r&&(u=r.h)}return{title:u,contents:i.map(([r])=>r)}})},tt=(e,t,s={})=>{const n=Ct(t,e,{fuzzy:.2,maxFuzzy:3,...s}).map(({suggestion:o})=>o);return e.includes(" ")?n:n.filter(o=>!o.includes(" "))},bt=et(V(JSON.parse("{\"/\":{\"documentCount\":20,\"nextId\":20,\"documentIds\":{\"0\":\"0\",\"1\":\"1\",\"2\":\"1#前言\",\"3\":\"1#学生思维\",\"4\":\"1#关于自学\",\"5\":\"1#计算机专业生存指北\",\"6\":\"1#如何提问\",\"7\":\"1#如何获取知识\",\"8\":\"1#后记\",\"9\":\"3\",\"10\":\"3#_1-算法\",\"11\":\"3#_2-后端\",\"12\":\"3#什么是后端\",\"13\":\"3#后端干什么\",\"14\":\"3#后端学什么\",\"15\":\"3#_2-前端\",\"16\":\"3#什么是前端\",\"17\":\"3#前端干什么\",\"18\":\"3#前端学什么\",\"19\":\"4\"},\"fieldIds\":{\"h\":0,\"t\":1,\"c\":2},\"fieldLength\":{\"0\":[1,10],\"1\":[1],\"2\":[1,11],\"3\":[2,11],\"4\":[1,21],\"5\":[1,26],\"6\":[2,20],\"7\":[1,34],\"8\":[1,13],\"9\":[1,4],\"10\":[2,66],\"11\":[2],\"12\":[2,9],\"13\":[1,7],\"14\":[2,39],\"15\":[2],\"16\":[2,6],\"17\":[1,5],\"18\":[2,14],\"19\":[1,3]},\"averageFieldLength\":[1.45,17.482424242424248],\"storedFields\":{\"0\":{\"h\":\"简介\",\"t\":[\"你好啊，欢迎来到LIT-CS-WIKI,这里是洛阳理工学院计算机专业的指南\",\"在这里，我们为新生提供了一些关于专业相关的知识，力求可以让各位可以快速上手成为一名\\\"合格的\\\"计算机专业学生\"]},\"1\":{\"h\":\"\"},\"2\":{\"h\":\"前言\",\"t\":[\"你真的长大了吗？\",\"还记得去年的这个时候，我抱着一腔热血（和头铁）选择了计算机专业， 那个时候的我对计算机可谓是一窍不通，行业前景可是一点都不了解。\",\"在过去的一年中我也犯了很多错误，作为比你大一届的学长，我觉得我有义务将这些事情挑明给你们看。\"]},\"3\":{\"h\":\"学生思维？\",\"t\":[\"上大学之后最重要的一点就是摆脱学生思维\",\"和高中不同，上了大学你就是一个成年人了，学校和社会都会以一个成年人的角度看你， 所以有很多事你们应该有自己的看法，一个事情在做之前先好好的想想做了对我有什么好处，有好处我该如何去做，没有好处我该如何去推， 这才是一个成年人该有的样子\",\"记住，这个世界上最值钱的东西永远是你的时间\"]},\"4\":{\"h\":\"关于自学\",\"t\":[\"这是一段艰苦的过程\",\"相对高中，大学的课程更加放松，理论上你大学只要完成学校的学业和要求的分数就可以顺利毕业\",\"但这真的够了吗？\",\"我相信来到这个专业的各位中还是有一部分人打算上完本科后直接在计算机行业就业的，如果你和我一样面向就业，那么很不幸，学校教的内容远远不足于去就业， 而缺少的这些内容只能通过你课外自学补足。\",\"不自学就失业，这已经快要成为业内人士的共识了， 所以为了找到一份工作，你必须要舍弃掉大部分的游戏时间来进行工作技术的学习。这就是这个行业的现状，你周围的人没有自学是他们的问题， 而你，应该自学。\",\"上了大学就轻松了，这句话一直都是骗人的。\"]},\"5\":{\"h\":\"计算机专业生存指北\",\"t\":[\"《提问的艺术》深度好文，建议全文阅读\",\"https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way/blob/main/README-zh_CN.md\",\"作为一名计算机新生，你在编程的过程中肯定会遇到很多问题，这些问题应该怎么解决？我该如何寻求帮助？读了下文可能会对你有所帮助\"]},\"6\":{\"h\":\"如何提问？\",\"t\":[\"这个表情包怎么样？我百度搜出来的：D\",\"现在是互联网时代，你学习中99%的问题都可以在互联网上找到答案，这是成本最低也最有效的方式，在问问题之前记得先在网上搜索一下， 只有在真找不到答案的情况下再来向别人求助\",\"推荐的收索引擎\",\"bing\",\"Google\",\"为什么不能直接求助\",\"记住，凡事都是有代价的，这个世界上没有人会无缘无故的对你好，你如果每次问问的问题都是网上一搜就有的问题，时间长了别人就会对你失去耐心， 你的每一次提问，都是在消耗你的形象\"]},\"7\":{\"h\":\"如何获取知识\",\"t\":[\"还是搜索引擎，互联网上目前充斥的大量的资料，只要你用心去找，一定可以找到你想要的资料（b站大学，你最好的自学课堂）\",\"查资料前\",\"虽然互联网上的资料很多，但是由于过于低的发布成本，导致了互联网资料的良莠不齐，所以我建议你在寻找一门课之前先打听一下这个资料是否适于你的学习\",\"查资料中\",\"对于计算机专业的资料，最多的就是两种\",\"以下内容并非绝对，具体情况请自行分析\",\"文档\",\"文档的特点是快，细且难，读文档是最快的学习方式，里面可以说是包含了这个技术的一切知识， 但由于只能自己阅读且没人踩坑，所以文档的阅读难度一般都比较高\",\"课程\",\"课程的特点是快，略且难，课程由于有老师手把手讲解，所以会比文档好上手很多，但是相对的，由于时间等种种因素 ，课程往往只会讲最常用的部分\",\"最佳体验\",\"先看课程快速学习了解，在实践的过程中看文档查缺补漏未尝不是一个好的方式\"]},\"8\":{\"h\":\"后记\",\"t\":[\"虽然最初在前言中写到大学很苦，但其实是有一定的夸张成分在里面的，我本人也是一名游戏爱好者，时不时会玩些游戏， 视频什么的更是一直有再刷， 你的生活和学习重来不是向冲突的，在处理好时间后你往往会发现自己即玩好了也学好了， 会想我的大一时光，虽然又是很累，但还是快乐， 如果可以的话，请尽情享受你的大学时光吧\",\"这很有可能是你人生中最后的轻松时光\"]},\"9\":{\"h\":\"计算机技术学习建议\",\"t\":[\"我们这里只能跟据我们自身的经历给到建议，\",\"很多时候需要你自己了解了事实后去进行判断， 本文内容只适合计算机新手，大佬请放过\"]},\"10\":{\"h\":\"1.算法\",\"t\":[\"算法是一切的根石\",\"不论是就业还是比赛（有的岗位甚至以算法为生），算法一直都是不可缺少的一环，作为一名计算机专业的学生，有一个好的算法基础是尤为重要的。\",\"推荐平台\",\"AcWing\",\"洛谷\",\"C语言网\",\"leetcode\",\"什么是算法竞赛\",\"顾名思义，算法竞赛就是考算法的竞赛（废话） 算法竞赛的主要考核内容是在规定时间内使用编程语言完成题目要求的问题，说白了也就是做题 算法竞赛分有很多，含金量各不相通\",\"（ps:含金量代表一切，只有含金量高的比赛获奖才有意义，才能吸引hr（面试官）的注意， 如果你获得的奖根本就没什么人听过，那大概率就是没啥价值）\",\"算竞学习等于算法学习吗？ 我要不要在算竞上死磕？\",\"首先，我们需要明确的一点是算经学习和算法学习并不完全相同，算经学习可以说是算法学习的子集 而算法学习的另一个子集则是工作上常用的算法（也就是就业面试的笔试题），两者虽然存在交叉， 但不完全相同\",\"算法是每个人都逃不过的，你在工作处理业务时指不定就会用到某个算法来解决实际问题，但这和算竞的区别就很大了\",\"要不要在算竞上死磕？\",\"首先，如果能拿奖一定是最好的，但我们不得不承认的一点是，算法这个东西很看天赋和资源， 如果没有这方面的天赋，很难会有出色的成绩。\",\"举个例子，如果想要获得算法类竞赛含金量第一档的ICPC-ACM想要获得省银（大概是蓝桥杯国二以上的水准？）以上的奖项， 小时候的基础，天赋，较好的资源三者至少应该 拥有一个，如果都没有，那就很难拿省银以上的奖项了。 我见过很多人搞了一年的acm，结果竹篮打水一场空。\",\"所以在一段时间的算竟学习后，如果你感觉算竞赛不适合你，那么请走向开发吧\",\"最后总结\",\"算竟！=算法\",\"不学算竟！=不学算法\"]},\"11\":{\"h\":\"2.后端\"},\"12\":{\"h\":\"什么是后端？\",\"t\":[\"我们一般将在软件开发中处理数据交互，用户请求，业务逻辑的工作称之为后端\",\"举个例子，当你玩某二字游戏时，你输入账号和密码后便可以得到你的账户信息（角色数量，用户名称....），这个信息的传递就是后端完成的\"]},\"13\":{\"h\":\"后端干什么\",\"t\":[\"CRUD：对数据的增改删查是后端的基本工 安全认证：确保数据库内的信息不会泄露 API开发：设计接口并于前端通信\",\"<后面的区域以后再来探索吧>\"]},\"14\":{\"h\":\"后端学什么？\",\"t\":[\"编程语言 目前市面上主流的后端语言有很多，java，c#（.NET），go，js(nodejs)，python(django),kotlin等 就目前市场行情来看后端的供给远远大于需求，如果想要成为一名后端开发工程师，掌握众多技术是必要的\",\"Sql 数据库用于存储数据（你游戏的角色数量以及你充值的钱全部保存在数据库里），供后端进行调用，sql语言的学习与crud的使用也是不可获取的\",\"常见Sql\",\"MySql\",\"NoSql 用于存储临时数据，相对sql存取效率更高\",\"常见NoSql\",\"Redis\",\"MongoDB\",\"MQ 用于解决类似“限时抢购“一类高流量，高耦合的处理工具\",\"常见MQ\",\"RabbitMQ\",\"Kafka\",\"RocketMQ\",\"<后面的区域以后再来探索吧>\",\"推荐链接：\",\"java后端学习路线及课程\"]},\"15\":{\"h\":\"2.前端\"},\"16\":{\"h\":\"什么是前端？\",\"t\":[\"我们一般将在软件开发中处理用户交互，界面展示的工作称为前端\",\"举个例子，当你玩某二字游戏时，你输入账号的那个聊天框以及整个你能看到的界面，理论上都属于前端\"]},\"17\":{\"h\":\"前端干什么\",\"t\":[\"界面呈现：将一个优美的界面呈现给客户，吸引客户眼球 产品设计：怎么设计界面才能既美观又实用也是前端的责任\"]},\"18\":{\"h\":\"前端学什么？\",\"t\":[\"三大件（html，css，js）是前端的基础，理论上通过这三样就能写出市面上所有的网页\",\"接着就是前端框架（Angular，Vue，React）三者任选一个，框架可以加速我们的开发\",\"接着就是网页设计和多种库ts，nodejs等技术的学习了\"]},\"19\":{\"h\":\"\",\"t\":[\"404 Not Found\"]}},\"dirtCount\":0,\"index\":[[\"found\",{\"1\":{\"19\":1}}],[\"404\",{\"1\":{\"19\":1}}],[\"接着就是网页设计和多种库ts\",{\"1\":{\"18\":1}}],[\"接着就是前端框架\",{\"1\":{\"18\":1}}],[\"框架可以加速我们的开发\",{\"1\":{\"18\":1}}],[\"三者任选一个\",{\"1\":{\"18\":1}}],[\"三大件\",{\"1\":{\"18\":1}}],[\"vue\",{\"1\":{\"18\":1}}],[\"是前端的基础\",{\"1\":{\"18\":1}}],[\"怎么设计界面才能既美观又实用也是前端的责任\",{\"1\":{\"17\":1}}],[\"产品设计\",{\"1\":{\"17\":1}}],[\"吸引客户眼球\",{\"1\":{\"17\":1}}],[\"将一个优美的界面呈现给客户\",{\"1\":{\"17\":1}}],[\"界面呈现\",{\"1\":{\"17\":1}}],[\"界面展示的工作称为前端\",{\"1\":{\"16\":1}}],[\"理论上通过这三样就能写出市面上所有的网页\",{\"1\":{\"18\":1}}],[\"理论上都属于前端\",{\"1\":{\"16\":1}}],[\"理论上你大学只要完成学校的学业和要求的分数就可以顺利毕业\",{\"1\":{\"4\":1}}],[\"前端学什么\",{\"0\":{\"18\":1}}],[\"前端干什么\",{\"0\":{\"17\":1}}],[\"前端\",{\"0\":{\"15\":1}}],[\"前言\",{\"0\":{\"2\":1}}],[\"kafka\",{\"1\":{\"14\":1}}],[\"kotlin等\",{\"1\":{\"14\":1}}],[\"高耦合的处理工具\",{\"1\":{\"14\":1}}],[\"限时抢购\",{\"1\":{\"14\":1}}],[\"常见mq\",{\"1\":{\"14\":1}}],[\"常见nosql\",{\"1\":{\"14\":1}}],[\"常见sql\",{\"1\":{\"14\":1}}],[\"相对sql存取效率更高\",{\"1\":{\"14\":1}}],[\"相对高中\",{\"1\":{\"4\":1}}],[\"用于解决类似\",{\"1\":{\"14\":1}}],[\"用于存储临时数据\",{\"1\":{\"14\":1}}],[\"用户名称\",{\"1\":{\"12\":1}}],[\"用户请求\",{\"1\":{\"12\":1}}],[\"供后端进行调用\",{\"1\":{\"14\":1}}],[\"数据库用于存储数据\",{\"1\":{\"14\":1}}],[\"sql语言的学习与crud的使用也是不可获取的\",{\"1\":{\"14\":1}}],[\"sql\",{\"1\":{\"14\":1}}],[\"smart\",{\"1\":{\"5\":1}}],[\"掌握众多技术是必要的\",{\"1\":{\"14\":1}}],[\"就目前市场行情来看后端的供给远远大于需求\",{\"1\":{\"14\":1}}],[\"python\",{\"1\":{\"14\":1}}],[\"ps\",{\"1\":{\"10\":1}}],[\"not\",{\"1\":{\"19\":1}}],[\"nosql\",{\"1\":{\"14\":1}}],[\"nodejs等技术的学习了\",{\"1\":{\"18\":1}}],[\"nodejs\",{\"1\":{\"14\":1}}],[\"net\",{\"1\":{\"14\":1}}],[\"js\",{\"1\":{\"14\":1,\"18\":1}}],[\"java后端学习路线及课程\",{\"1\":{\"14\":1}}],[\"java\",{\"1\":{\"14\":1}}],[\"目前市面上主流的后端语言有很多\",{\"1\":{\"14\":1}}],[\"编程语言\",{\"1\":{\"14\":1}}],[\"<后面的区域以后再来探索吧>\",{\"1\":{\"13\":1,\"14\":1}}],[\"设计接口并于前端通信\",{\"1\":{\"13\":1}}],[\"确保数据库内的信息不会泄露\",{\"1\":{\"13\":1}}],[\"安全认证\",{\"1\":{\"13\":1}}],[\"对数据的增改删查是后端的基本工\",{\"1\":{\"13\":1}}],[\"对于计算机专业的资料\",{\"1\":{\"7\":1}}],[\"角色数量\",{\"1\":{\"12\":1}}],[\"当你玩某二字游戏时\",{\"1\":{\"12\":1,\"16\":1}}],[\"业务逻辑的工作称之为后端\",{\"1\":{\"12\":1}}],[\"什么是前端\",{\"0\":{\"16\":1}}],[\"什么是后端\",{\"0\":{\"12\":1}}],[\"什么是算法竞赛\",{\"1\":{\"10\":1}}],[\"后端学什么\",{\"0\":{\"14\":1}}],[\"后端干什么\",{\"0\":{\"13\":1}}],[\"后端\",{\"0\":{\"11\":1}}],[\"后记\",{\"0\":{\"8\":1}}],[\"2\",{\"0\":{\"11\":1,\"15\":1}}],[\"=不学算法\",{\"1\":{\"10\":1}}],[\"=算法\",{\"1\":{\"10\":1}}],[\"结果竹篮打水一场空\",{\"1\":{\"10\":1}}],[\"拥有一个\",{\"1\":{\"10\":1}}],[\"较好的资源三者至少应该\",{\"1\":{\"10\":1}}],[\"天赋\",{\"1\":{\"10\":1}}],[\"小时候的基础\",{\"1\":{\"10\":1}}],[\"以上的奖项\",{\"1\":{\"10\":1}}],[\"以下内容并非绝对\",{\"1\":{\"7\":1}}],[\"举个例子\",{\"1\":{\"10\":1,\"12\":1,\"16\":1}}],[\"很难会有出色的成绩\",{\"1\":{\"10\":1}}],[\"很多时候需要你自己了解了事实后去进行判断\",{\"1\":{\"9\":1}}],[\"要不要在算竞上死磕\",{\"1\":{\"10\":1}}],[\"两者虽然存在交叉\",{\"1\":{\"10\":1}}],[\"也就是就业面试的笔试题\",{\"1\":{\"10\":1}}],[\"首先\",{\"1\":{\"10\":2}}],[\"算竟\",{\"1\":{\"10\":1}}],[\"算经学习可以说是算法学习的子集\",{\"1\":{\"10\":1}}],[\"算竞学习等于算法学习吗\",{\"1\":{\"10\":1}}],[\"算法这个东西很看天赋和资源\",{\"1\":{\"10\":1}}],[\"算法是每个人都逃不过的\",{\"1\":{\"10\":1}}],[\"算法是一切的根石\",{\"1\":{\"10\":1}}],[\"算法竞赛分有很多\",{\"1\":{\"10\":1}}],[\"算法竞赛的主要考核内容是在规定时间内使用编程语言完成题目要求的问题\",{\"1\":{\"10\":1}}],[\"算法竞赛就是考算法的竞赛\",{\"1\":{\"10\":1}}],[\"算法一直都是不可缺少的一环\",{\"1\":{\"10\":1}}],[\"算法\",{\"0\":{\"10\":1}}],[\"的注意\",{\"1\":{\"10\":1}}],[\"的问题都可以在互联网上找到答案\",{\"1\":{\"6\":1}}],[\"面试官\",{\"1\":{\"10\":1}}],[\"才能吸引hr\",{\"1\":{\"10\":1}}],[\"含金量代表一切\",{\"1\":{\"10\":1}}],[\"含金量各不相通\",{\"1\":{\"10\":1}}],[\"说白了也就是做题\",{\"1\":{\"10\":1}}],[\"废话\",{\"1\":{\"10\":1}}],[\"顾名思义\",{\"1\":{\"10\":1}}],[\"leetcode\",{\"1\":{\"10\":1}}],[\"洛谷\",{\"1\":{\"10\":1}}],[\"angular\",{\"1\":{\"18\":1}}],[\"api开发\",{\"1\":{\"13\":1}}],[\"acm想要获得省银\",{\"1\":{\"10\":1}}],[\"acwing\",{\"1\":{\"10\":1}}],[\"ask\",{\"1\":{\"5\":1}}],[\"推荐链接\",{\"1\":{\"14\":1}}],[\"推荐平台\",{\"1\":{\"10\":1}}],[\"推荐的收索引擎\",{\"1\":{\"6\":1}}],[\"有一个好的算法基础是尤为重要的\",{\"1\":{\"10\":1}}],[\"有的岗位甚至以算法为生\",{\"1\":{\"10\":1}}],[\"有好处我该如何去做\",{\"1\":{\"3\":1}}],[\"不学算竟\",{\"1\":{\"10\":1}}],[\"不论是就业还是比赛\",{\"1\":{\"10\":1}}],[\"不自学就失业\",{\"1\":{\"4\":1}}],[\"1\",{\"0\":{\"10\":1}}],[\"大概是蓝桥杯国二以上的水准\",{\"1\":{\"10\":1}}],[\"大佬请放过\",{\"1\":{\"9\":1}}],[\"大学的课程更加放松\",{\"1\":{\"4\":1}}],[\"本文内容只适合计算机新手\",{\"1\":{\"9\":1}}],[\"计算机技术学习建议\",{\"0\":{\"9\":1}}],[\"计算机专业生存指北\",{\"0\":{\"5\":1}}],[\"计算机专业学生\",{\"1\":{\"0\":1}}],[\"请尽情享受你的大学时光吧\",{\"1\":{\"8\":1}}],[\"会想我的大一时光\",{\"1\":{\"8\":1}}],[\"视频什么的更是一直有再刷\",{\"1\":{\"8\":1}}],[\"时不时会玩些游戏\",{\"1\":{\"8\":1}}],[\"时间长了别人就会对你失去耐心\",{\"1\":{\"6\":1}}],[\"虽然又是很累\",{\"1\":{\"8\":1}}],[\"虽然最初在前言中写到大学很苦\",{\"1\":{\"8\":1}}],[\"虽然互联网上的资料很多\",{\"1\":{\"7\":1}}],[\"先看课程快速学习了解\",{\"1\":{\"7\":1}}],[\"最后总结\",{\"1\":{\"10\":1}}],[\"最佳体验\",{\"1\":{\"7\":1}}],[\"最多的就是两种\",{\"1\":{\"7\":1}}],[\"由于时间等种种因素\",{\"1\":{\"7\":1}}],[\"略且难\",{\"1\":{\"7\":1}}],[\"课程往往只会讲最常用的部分\",{\"1\":{\"7\":1}}],[\"课程由于有老师手把手讲解\",{\"1\":{\"7\":1}}],[\"课程的特点是快\",{\"1\":{\"7\":1}}],[\"课程\",{\"1\":{\"7\":1}}],[\"里面可以说是包含了这个技术的一切知识\",{\"1\":{\"7\":1}}],[\"读文档是最快的学习方式\",{\"1\":{\"7\":1}}],[\"读了下文可能会对你有所帮助\",{\"1\":{\"5\":1}}],[\"细且难\",{\"1\":{\"7\":1}}],[\"文档的特点是快\",{\"1\":{\"7\":1}}],[\"文档\",{\"1\":{\"7\":1}}],[\"具体情况请自行分析\",{\"1\":{\"7\":1}}],[\"查资料中\",{\"1\":{\"7\":1}}],[\"查资料前\",{\"1\":{\"7\":1}}],[\"导致了互联网资料的良莠不齐\",{\"1\":{\"7\":1}}],[\"但我们不得不承认的一点是\",{\"1\":{\"10\":1}}],[\"但这和算竞的区别就很大了\",{\"1\":{\"10\":1}}],[\"但这真的够了吗\",{\"1\":{\"4\":1}}],[\"但不完全相同\",{\"1\":{\"10\":1}}],[\"但还是快乐\",{\"1\":{\"8\":1}}],[\"但其实是有一定的夸张成分在里面的\",{\"1\":{\"8\":1}}],[\"但是相对的\",{\"1\":{\"7\":1}}],[\"但是由于过于低的发布成本\",{\"1\":{\"7\":1}}],[\"但由于只能自己阅读且没人踩坑\",{\"1\":{\"7\":1}}],[\"一类高流量\",{\"1\":{\"14\":1}}],[\"一定可以找到你想要的资料\",{\"1\":{\"7\":1}}],[\"一个事情在做之前先好好的想想做了对我有什么好处\",{\"1\":{\"3\":1}}],[\"只有含金量高的比赛获奖才有意义\",{\"1\":{\"10\":1}}],[\"只有在真找不到答案的情况下再来向别人求助\",{\"1\":{\"6\":1}}],[\"只要你用心去找\",{\"1\":{\"7\":1}}],[\"互联网上目前充斥的大量的资料\",{\"1\":{\"7\":1}}],[\"还是搜索引擎\",{\"1\":{\"7\":1}}],[\"还记得去年的这个时候\",{\"1\":{\"2\":1}}],[\"都是在消耗你的形象\",{\"1\":{\"6\":1}}],[\"凡事都是有代价的\",{\"1\":{\"6\":1}}],[\"为什么不能直接求助\",{\"1\":{\"6\":1}}],[\"go\",{\"1\":{\"14\":1}}],[\"google\",{\"1\":{\"6\":1}}],[\"github\",{\"1\":{\"5\":1}}],[\"b站大学\",{\"1\":{\"7\":1}}],[\"bing\",{\"1\":{\"6\":1}}],[\"blob\",{\"1\":{\"5\":1}}],[\"现在是互联网时代\",{\"1\":{\"6\":1}}],[\"django\",{\"1\":{\"14\":1}}],[\"d\",{\"1\":{\"6\":1}}],[\"如果想要成为一名后端开发工程师\",{\"1\":{\"14\":1}}],[\"如果想要获得算法类竞赛含金量第一档的icpc\",{\"1\":{\"10\":1}}],[\"如果都没有\",{\"1\":{\"10\":1}}],[\"如果没有这方面的天赋\",{\"1\":{\"10\":1}}],[\"如果能拿奖一定是最好的\",{\"1\":{\"10\":1}}],[\"如果你感觉算竞赛不适合你\",{\"1\":{\"10\":1}}],[\"如果你获得的奖根本就没什么人听过\",{\"1\":{\"10\":1}}],[\"如果你和我一样面向就业\",{\"1\":{\"4\":1}}],[\"如果可以的话\",{\"1\":{\"8\":1}}],[\"如何获取知识\",{\"0\":{\"7\":1}}],[\"如何提问\",{\"0\":{\"6\":1}}],[\"作为一名计算机专业的学生\",{\"1\":{\"10\":1}}],[\"作为一名计算机新生\",{\"1\":{\"5\":1}}],[\"作为比你大一届的学长\",{\"1\":{\"2\":1}}],[\"mq\",{\"1\":{\"14\":1}}],[\"mongodb\",{\"1\":{\"14\":1}}],[\"mysql\",{\"1\":{\"14\":1}}],[\"md\",{\"1\":{\"5\":1}}],[\"main\",{\"1\":{\"5\":1}}],[\"zh\",{\"1\":{\"5\":1}}],[\"rocketmq\",{\"1\":{\"14\":1}}],[\"rabbitmq\",{\"1\":{\"14\":1}}],[\"react\",{\"1\":{\"18\":1}}],[\"readme\",{\"1\":{\"5\":1}}],[\"redis\",{\"1\":{\"14\":1}}],[\"ryanhanwu\",{\"1\":{\"5\":1}}],[\"way\",{\"1\":{\"5\":1}}],[\"wiki\",{\"1\":{\"0\":1}}],[\"the\",{\"1\":{\"5\":1}}],[\"to\",{\"1\":{\"5\":1}}],[\"questions\",{\"1\":{\"5\":1}}],[\"html\",{\"1\":{\"18\":1}}],[\"https\",{\"1\":{\"5\":1}}],[\"how\",{\"1\":{\"5\":1}}],[\"c\",{\"1\":{\"14\":1}}],[\"crud\",{\"1\":{\"13\":1}}],[\"c语言网\",{\"1\":{\"10\":1}}],[\"cn\",{\"1\":{\"5\":1}}],[\"com\",{\"1\":{\"5\":1}}],[\"css\",{\"1\":{\"18\":1}}],[\"cs\",{\"1\":{\"0\":1}}],[\"建议全文阅读\",{\"1\":{\"5\":1}}],[\"深度好文\",{\"1\":{\"5\":1}}],[\"提问的艺术\",{\"1\":{\"5\":1}}],[\"应该自学\",{\"1\":{\"4\":1}}],[\"而算法学习的另一个子集则是工作上常用的算法\",{\"1\":{\"10\":1}}],[\"而你\",{\"1\":{\"4\":1}}],[\"而缺少的这些内容只能通过你课外自学补足\",{\"1\":{\"4\":1}}],[\"所以在一段时间的算竟学习后\",{\"1\":{\"10\":1}}],[\"所以会比文档好上手很多\",{\"1\":{\"7\":1}}],[\"所以文档的阅读难度一般都比较高\",{\"1\":{\"7\":1}}],[\"所以我建议你在寻找一门课之前先打听一下这个资料是否适于你的学习\",{\"1\":{\"7\":1}}],[\"所以为了找到一份工作\",{\"1\":{\"4\":1}}],[\"所以有很多事你们应该有自己的看法\",{\"1\":{\"3\":1}}],[\"那么请走向开发吧\",{\"1\":{\"10\":1}}],[\"那么很不幸\",{\"1\":{\"4\":1}}],[\"那就很难拿省银以上的奖项了\",{\"1\":{\"10\":1}}],[\"那大概率就是没啥价值\",{\"1\":{\"10\":1}}],[\"那个时候的我对计算机可谓是一窍不通\",{\"1\":{\"2\":1}}],[\"关于自学\",{\"0\":{\"4\":1}}],[\"记住\",{\"1\":{\"3\":1,\"6\":1}}],[\"这很有可能是你人生中最后的轻松时光\",{\"1\":{\"8\":1}}],[\"这是成本最低也最有效的方式\",{\"1\":{\"6\":1}}],[\"这是一段艰苦的过程\",{\"1\":{\"4\":1}}],[\"这个信息的传递就是后端完成的\",{\"1\":{\"12\":1}}],[\"这个世界上没有人会无缘无故的对你好\",{\"1\":{\"6\":1}}],[\"这个世界上最值钱的东西永远是你的时间\",{\"1\":{\"3\":1}}],[\"这个表情包怎么样\",{\"1\":{\"6\":1}}],[\"这些问题应该怎么解决\",{\"1\":{\"5\":1}}],[\"这句话一直都是骗人的\",{\"1\":{\"4\":1}}],[\"这就是这个行业的现状\",{\"1\":{\"4\":1}}],[\"这已经快要成为业内人士的共识了\",{\"1\":{\"4\":1}}],[\"这才是一个成年人该有的样子\",{\"1\":{\"3\":1}}],[\"这里是洛阳理工学院计算机专业的指南\",{\"1\":{\"0\":1}}],[\"没有好处我该如何去推\",{\"1\":{\"3\":1}}],[\"学校教的内容远远不足于去就业\",{\"1\":{\"4\":1}}],[\"学校和社会都会以一个成年人的角度看你\",{\"1\":{\"3\":1}}],[\"学生思维\",{\"0\":{\"3\":1}}],[\"上了大学就轻松了\",{\"1\":{\"4\":1}}],[\"上了大学你就是一个成年人了\",{\"1\":{\"3\":1}}],[\"上大学之后最重要的一点就是摆脱学生思维\",{\"1\":{\"3\":1}}],[\"和高中不同\",{\"1\":{\"3\":1}}],[\"和头铁\",{\"1\":{\"2\":1}}],[\"在处理好时间后你往往会发现自己即玩好了也学好了\",{\"1\":{\"8\":1}}],[\"在实践的过程中看文档查缺补漏未尝不是一个好的方式\",{\"1\":{\"7\":1}}],[\"在问问题之前记得先在网上搜索一下\",{\"1\":{\"6\":1}}],[\"在过去的一年中我也犯了很多错误\",{\"1\":{\"2\":1}}],[\"在这里\",{\"1\":{\"0\":1}}],[\"行业前景可是一点都不了解\",{\"1\":{\"2\":1}}],[\"选择了计算机专业\",{\"1\":{\"2\":1}}],[\"我见过很多人搞了一年的acm\",{\"1\":{\"10\":1}}],[\"我要不要在算竞上死磕\",{\"1\":{\"10\":1}}],[\"我们一般将在软件开发中处理用户交互\",{\"1\":{\"16\":1}}],[\"我们一般将在软件开发中处理数据交互\",{\"1\":{\"12\":1}}],[\"我们需要明确的一点是算经学习和算法学习并不完全相同\",{\"1\":{\"10\":1}}],[\"我们这里只能跟据我们自身的经历给到建议\",{\"1\":{\"9\":1}}],[\"我们为新生提供了一些关于专业相关的知识\",{\"1\":{\"0\":1}}],[\"我本人也是一名游戏爱好者\",{\"1\":{\"8\":1}}],[\"我百度搜出来的\",{\"1\":{\"6\":1}}],[\"我该如何寻求帮助\",{\"1\":{\"5\":1}}],[\"我相信来到这个专业的各位中还是有一部分人打算上完本科后直接在计算机行业就业的\",{\"1\":{\"4\":1}}],[\"我觉得我有义务将这些事情挑明给你们看\",{\"1\":{\"2\":1}}],[\"我抱着一腔热血\",{\"1\":{\"2\":1}}],[\"你输入账号的那个聊天框以及整个你能看到的界面\",{\"1\":{\"16\":1}}],[\"你输入账号和密码后便可以得到你的账户信息\",{\"1\":{\"12\":1}}],[\"你游戏的角色数量以及你充值的钱全部保存在数据库里\",{\"1\":{\"14\":1}}],[\"你在工作处理业务时指不定就会用到某个算法来解决实际问题\",{\"1\":{\"10\":1}}],[\"你在编程的过程中肯定会遇到很多问题\",{\"1\":{\"5\":1}}],[\"你的生活和学习重来不是向冲突的\",{\"1\":{\"8\":1}}],[\"你的每一次提问\",{\"1\":{\"6\":1}}],[\"你最好的自学课堂\",{\"1\":{\"7\":1}}],[\"你如果每次问问的问题都是网上一搜就有的问题\",{\"1\":{\"6\":1}}],[\"你学习中99\",{\"1\":{\"6\":1}}],[\"你周围的人没有自学是他们的问题\",{\"1\":{\"4\":1}}],[\"你必须要舍弃掉大部分的游戏时间来进行工作技术的学习\",{\"1\":{\"4\":1}}],[\"你真的长大了吗\",{\"1\":{\"2\":1}}],[\"你好啊\",{\"1\":{\"0\":1}}],[\"合格的\",{\"1\":{\"0\":1}}],[\"力求可以让各位可以快速上手成为一名\",{\"1\":{\"0\":1}}],[\"欢迎来到lit\",{\"1\":{\"0\":1}}],[\"简介\",{\"0\":{\"0\":1}}]],\"serializationVersion\":2}}")).map(([e,t])=>[e,zt(t,{fields:["h","t","c"],storeFields:["h","t","c"]})]));self.onmessage=({data:{type:e="all",query:t,locale:s,options:n,id:o}})=>{const u=bt[s];e==="suggest"?self.postMessage([e,o,tt(t,u,n)]):e==="search"?self.postMessage([e,o,Z(t,u,n)]):self.postMessage({suggestions:[e,o,tt(t,u,n)],results:[e,o,Z(t,u,n)]})};
//# sourceMappingURL=index.js.map
